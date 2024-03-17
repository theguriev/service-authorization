const requestBodySchema = z.object({
  name: z.string().min(3).max(20)
})

export default eventHandler(async (event) => {
  const _id = await getUserId(event)
  const {
    name
  } = await zodValidateBody(event, requestBodySchema.parse)
  await ModelUser.updateOne(
    {
      _id
    },
    {
      $set: {
        name
      }
    }
  )
  const userExist = await ModelUser.findOne({
    _id
  })
  if (userExist === null) {
    throw createError({ message: 'User not exists!', status: 409 })
  }
  return userExist
})
