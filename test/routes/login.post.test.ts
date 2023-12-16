describe('login.post', () => {
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
})
