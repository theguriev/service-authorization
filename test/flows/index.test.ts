describe('index', () => {
  it('should render index', async () => {
    await $fetch('/', {
      baseURL: 'http://localhost:3000',
      onResponse: ({ response }) => {
        expect(response.status).toBe(200)
        expect(response._data).toMatchObject({ nitro: 'Is Awesome!' })
      }
    })
  })
})
