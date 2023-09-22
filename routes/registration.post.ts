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
  const { secret } = useRuntimeConfig();
  const password = passwordHash(purePassword);
  const oldUser = new ModelUser();
  const userExist = await oldUser.collection.findOne({ email, password });
  if (userExist !== null) {
    setResponseStatus(event, 409);
    return {
      error: "User already exists!",
    };
  }
  const user = new ModelUser({ email, password, name });
  const userSaved = await user.save();
  const userId = userSaved._id.toString();
  const token = issueRefreshToken();
  const timestamp = Date.now();
  const refreshToken = new ModelToken({ userId, token, timestamp });
  const refreshTokenSaved = await refreshToken.save();
  const expiresRefreshToken = new Date(timestamp + 1000 * 60 * 60 * 24 * 30);
  const expiresAccessToken = new Date(timestamp + 1000 * 60 * 15);

  setCookie(event, "refreshToken", refreshTokenSaved.token!, {
    httpOnly: true,
    expires: expiresRefreshToken,
  });

  const accessToken = issueAccessToken({ userId, email, name }, { secret });

  setCookie(event, "accessToken", accessToken, {
    httpOnly: true,
    expires: expiresAccessToken,
  });

  return userSaved;
});
