export default eventHandler(async (event) => {
  const accessToken = getCookie(event, 'accessToken')
  const { secret } = useRuntimeConfig()
  if (accessToken) {
    try {
      const { userId } = await verify(accessToken, secret)
      const userExist = await ModelUser.findOne({
        _id: userId
      })
      if (userExist === null) {
        setResponseStatus(event, 409)
        return {
          error: 'User not exists!'
        }
      }
      return userExist
    } catch (error) {
      return error
    }
  }
  setResponseStatus(event, 404)
  return {
    error: 'Access token not found!'
  }
})
