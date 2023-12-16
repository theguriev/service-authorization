export {}
declare global {
  const $fetch: typeof import('ofetch')['$fetch']
  const describe: typeof import('vitest')['describe']
  const expect: typeof import('vitest')['expect']
  const issueAccessToken: typeof import('/Users/eugen/work/service-authorization/utils/issueAccessToken')['default']
  const issueRefreshToken: typeof import('/Users/eugen/work/service-authorization/utils/issueRefreshToken')['default']
  const it: typeof import('vitest')['it']
  const passwordHash: typeof import('/Users/eugen/work/service-authorization/utils/passwordHash')['default']
}