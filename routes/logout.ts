/* eslint-disable import/default */
import jwt from 'jsonwebtoken'

const verify = (token: string, secret:string) => new Promise<jwt.JwtPayload>((resolve, reject) => {
  // eslint-disable-next-line import/no-named-as-default-member
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      reject(err)
    }
    resolve(decoded as jwt.JwtPayload)
  })
})

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
