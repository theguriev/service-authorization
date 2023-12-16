export default eventHandler(async (event) => {
  if (!process.env.TEST) {
    return
  }
  const { email, password, name } = await readBody(event)
  const userDocument = new ModelUser({ email, password, name })
  await userDocument.save()
  return { email, password, name }
})
