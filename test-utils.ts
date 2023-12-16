import { tmpdir } from 'node:os'
import { promises as fsp } from 'node:fs'
import { createNitro, build, prepare, copyPublicAssets, prerender } from 'nitropack'
import type { Nitro, NitroConfig } from 'nitropack'
import { join, resolve } from 'pathe'
import { listen, Listener } from 'listhen'
import { fetch, FetchOptions } from 'ofetch'
import { afterAll } from 'vitest'
import { fileURLToPath } from 'mlly'
import { joinURL } from 'ufo'
import { defu } from 'defu'

export interface Context {
    preset: string;
    nitro?: Nitro;
    rootDir: string;
    outDir: string;
    fetch: (url: string, opts?: FetchOptions) => Promise<any>;
    server?: Listener;
    env: Record<string, string>;
  }

export const fixtureDir = fileURLToPath(
  new URL('.', import.meta.url).href
)

export const getPresetTmpDir = (preset: string) =>
  resolve(
    process.env.NITRO_TEST_TMP_DIR || join(tmpdir(), 'nitro-tests'),
    preset
  )

export async function setupTest (
  preset: string,
  opts: { config?: NitroConfig } = {}
) {
  const presetTmpDir = getPresetTmpDir(preset)

  await fsp.rm(presetTmpDir, { recursive: true }).catch(() => {})
  await fsp.mkdir(presetTmpDir, { recursive: true })

  const ctx: Context = {
    preset,
    rootDir: fixtureDir,
    outDir: resolve(fixtureDir, presetTmpDir, '.output'),
    env: {
      NITRO_HELLO: 'world',
      CUSTOM_HELLO_THERE: 'general',
      SECRET: 'secret'
    },
    fetch: (url, opts): Promise<Response> =>
      fetch(joinURL(ctx.server!.url, url.slice(1)), {
        redirect: 'manual',
        ...(opts as any)
      })
  }

  // Set environment variables for process compatible presets
  for (const [name, value] of Object.entries(ctx.env)) {
    process.env[name] = value
  }

  const nitro = (ctx.nitro = await createNitro(
    defu(opts.config, {
      preset: ctx.preset,
      dev: false,
      rootDir: ctx.rootDir,
      runtimeConfig: {
        nitro: {
          envPrefix: 'CUSTOM_'
        }
      },
      buildDir: resolve(fixtureDir, presetTmpDir, '.nitro'),
      serveStatic: true,
      output: {
        dir: ctx.outDir
      },
      timing: true
    })
  ))

  await prepare(nitro)
  await copyPublicAssets(nitro)
  await prerender(nitro)
  await build(nitro)

  afterAll(async () => {
    if (ctx.server) {
      await ctx.server.close()
    }
    if (ctx.nitro) {
      await ctx.nitro.close()
    }
  })

  const entryPath = resolve(ctx.outDir, 'server/index.mjs')
  const { listener } = await import(entryPath)
  ctx.server = await listen(listener)
  console.log('>', ctx.server!.url)

  return ctx
}
