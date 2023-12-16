import { expect, it, describe } from 'vitest'
import { setupTest } from '../../test-utils'

describe('index', async () => {
  const ctx = await setupTest('node')

  it('should render index', async () => {
    const res: Response = await ctx.fetch('/')
    expect(res.status).toBe(200)
    expect(await res.json()).toMatchObject({ nitro: 'Is Awesome!' })
  })
})
