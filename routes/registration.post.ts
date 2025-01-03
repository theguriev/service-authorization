const requestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
  confirmation: z.string().min(8).max(20),
  meta: z.record(z.any())
}).refine(
  data => data.password === data.confirmation,
  {
    message: 'Passwords do not match!',
    path: ['confirmation']
  }
)

export default eventHandler(async (event) => {
  const {
    email,
    password: purePassword,
    meta
  } = await zodValidateBody(event, requestBodySchema.parse)
  const password = passwordHash(purePassword)
  const userExist = await ModelUser.findOne({
    $or: [{ email }]
  })
  if (userExist !== null) {
    throw createError({ message: 'User already exists!', status: 409 })
  }
  const userDocument = new ModelUser({ email, password, meta, timestamp: Date.now() })
  const userSaved = await userDocument.save()
  const userId = userSaved._id.toString()
  const { save } = useTokens({
    event,
    userId,
    email
  })
  save()

  return userSaved.toJSON()
})
