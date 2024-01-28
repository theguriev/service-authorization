const requestBodySchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  confirmation: z.string().min(8).max(20)
})

export default eventHandler(async (event) => {
  const {
    email,
    password: purePassword,
    name,
    confirmation
  } = await readValidatedBody(event, requestBodySchema.parse)
  if (purePassword !== confirmation) {
    throw createError({ message: 'Passwords do not match!', status: 400 })
  }
  const password = passwordHash(purePassword)
  const userExist = await ModelUser.findOne({
    $or: [{ email }, { name }]
  })
  if (userExist !== null) {
    throw createError({ message: 'User already exists!', status: 409 })
  }
  const userDocument = new ModelUser({ email, password, name, timestamp: Date.now() })
  const userSaved = await userDocument.save()
  const userId = userSaved._id.toString()
  const { save } = useTokens({
    event,
    userId,
    email,
    name
  })
  save()

  return userSaved.toJSON()
})
