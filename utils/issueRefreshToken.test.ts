import { describe, it, expect } from 'vitest'
import issueRefreshToken from './issueRefreshToken'

describe('issueRefreshToken', () => {
  it('should issue different tokens all the time', () => {
    expect(issueRefreshToken()).not.toBe(issueRefreshToken())
  })
})
