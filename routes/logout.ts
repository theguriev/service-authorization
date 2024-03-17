export default eventHandler(async (event) => {
  const userId = await getUserId(event)
  const refreshTokenDocument = new ModelToken()
  deleteCookie(event, 'accessToken')
  deleteCookie(event, 'refreshToken')
  return await refreshTokenDocument.collection.deleteMany({ userId })
})
