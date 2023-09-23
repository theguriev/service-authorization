const bodySchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export default eventHandler(async (event) => {
  const {
    email,
    password: purePassword,
    name,
  } = await readValidatedBody(event, bodySchema.parse);
  const password = passwordHash(purePassword);
  const userExist = await ModelUser.findOne({
    email,
    password,
  });
  if (userExist !== null) {
    setResponseStatus(event, 409);
    return {
      error: "User already exists!",
    };
  }
  const userDocument = new ModelUser({ email, password, name });
  const userSaved = await userDocument.save();
  const userId = userSaved._id.toString();
  const { save } = useTokens({
    event,
    userId,
    email,
    name,
  });
  save();

  return userSaved;
});
