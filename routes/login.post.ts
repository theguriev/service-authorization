const requestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20)
})

export default eventHandler(async (event) => {
  const { email, password: purePassword } = await readValidatedBody(
    event,
    requestBodySchema.parse
  )
  const password = passwordHash(purePassword)
  console.log('🚀 TESTING 2', email, purePassword)
  const userDocument = new ModelUser({ email, password })
  const userRecord = await userDocument.collection.findOne({ email, password })
  console.log('🚀 TESTING 3', userRecord)
  if (userRecord === null) {
    setResponseStatus(event, 403)
    return {
      error: 'Wront password or email!'
    }
  }
  console.log('TESTING 4')
  const userId = userRecord._id.toString()
  const { deleteByUserId, save } = useTokens({
    event,
    userId,
    email,
    name: userRecord.name
  })
  await deleteByUserId()
  await save()
  return { email, password }
})
