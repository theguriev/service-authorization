describe('login.post', () => {
  beforeAll(async () => {
    await $fetch('/test/create-dummy-user', {
      baseURL: 'http://localhost:3000',
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: { email: 'test@email.com', password: passwordHash('test1234'), name: 'test' }
    })
  })

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
      body: { email: 'test@email.com', password: 'test1234' },
      onResponse: ({ response }) => {
        const setCookie = response.headers.get('set-cookie')
        expect(response.status).toBe(200)
        expect(setCookie).contains('refreshToken=')
        expect(setCookie).contains('accessToken=')
      }
    })
  })
})
