describe('Authorization', () => {
  const uniqId = uuidv4().split('-')[0]
  const name = `test${uniqId}`
  const email = `test+${uniqId}@test.com`
  const password = 'test1234'
  let id = ''

  describe('POST /registration', () => {
    it('gets 200 on valid credentials', async () => {
      await $fetch('/registration', {
        baseURL: 'http://localhost:3000',
        method: 'POST',
        ignoreResponseError: true,
        headers: { Accept: 'application/json' },
        body: { name, email, password },
        onResponse: ({ response }) => {
          expect(response.status).toBe(200)
          expect(response._data._id).toBeDefined()
          id = response._data._id
          const setCookie = extractSetCookie(response.headers)
          const refreshTokenObj = setCookie.find(cookie => cookie.name === 'refreshToken')
          const accessTokenObj = setCookie.find(cookie => cookie.name === 'accessToken')
          expect(refreshTokenObj).toBeDefined()
          expect(accessTokenObj).toBeDefined()
        }
      })
    })
    it('gets 409 on already registered user', async () => {
      await $fetch('/registration', {
        baseURL: 'http://localhost:3000',
        method: 'POST',
        headers: { Accept: 'application/json' },
        ignoreResponseError: true,
        body: { name, email, password },
        onResponse: ({ response }) => {
          expect(response.status).toBe(409)
          expect(response._data).toMatchObject({ error: 'User already exists!' })
        }
      })
    })
  })

  describe('POST /login', () => {
    it('gets 403 on invalid credentials', async () => {
      await $fetch('/login', {
        baseURL: 'http://localhost:3000',
        method: 'POST',
        headers: { Accept: 'application/json' },
        ignoreResponseError: true,
        body: { email: 'wrong@email.com', password: 'test1234' },
        onResponse: ({ response }) => {
          expect(response.status).toBe(403)
          expect(response._data).toMatchObject({ error: 'Wront password or email!' })
        }
      })
    })

    it('gets 200 on valid credentials', async () => {
      await $fetch('/login', {
        baseURL: 'http://localhost:3000',
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: { email, password },
        onResponse: ({ response }) => {
          expect(response.status).toBe(200)
          const setCookie = extractSetCookie(response.headers)
          const refreshTokenObj = setCookie.find(cookie => cookie.name === 'refreshToken')
          const accessTokenObj = setCookie.find(cookie => cookie.name === 'accessToken')
          expect(refreshTokenObj).toBeDefined()
          expect(accessTokenObj).toBeDefined()
        }
      })
    })
  })
})
