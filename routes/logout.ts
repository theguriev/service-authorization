export default eventHandler(async (event) => {
  const accessToken = getCookie(event, 'accessToken')
  const { secret } = useRuntimeConfig()
  if (accessToken) {
    try {
      const { userId } = await verify(accessToken, secret)
      const refreshTokenDocument = new ModelToken()
      return await refreshTokenDocument.collection.deleteMany({ userId })
    } catch (error) {
      return error
    }
  }
  setResponseStatus(event, 404)
  return {
    error: 'Access token not found!'
  }
})
