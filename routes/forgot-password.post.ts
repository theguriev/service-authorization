const requestBodySchema = z.object({
  email: z.string().email()
})

export default eventHandler(async (event) => {
  const { email } = await readValidatedBody(event, requestBodySchema.parse)
  const user = await ModelUser.findOneAndUpdate(
    { email },
    {
      $set: {
        forgotPassword: { token: issueRefreshToken(), timestamp: Date.now() }
      }
    }
  )
  if (user === null) {
    setResponseStatus(event, 404)
    return {
      error: 'User not found!'
    }
  }
  return { ok: true }
})
