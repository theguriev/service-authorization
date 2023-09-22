const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export default eventHandler(async (event) => {
  const { secret } = useRuntimeConfig();
  const { email, password: purePassword } = await readValidatedBody(
    event,
    bodySchema.parse
  );
  const password = passwordHash(purePassword);
  const user = new ModelUser({ email, password });
  const result = await user.collection.findOne({ email, password });
  if (result === null) {
    setResponseStatus(event, 403);
    return {
      error: "Wront password or email!",
    };
  }
  const userId = result._id.toString();
  const oldRefreshToken = new ModelToken();
  oldRefreshToken.collection.deleteMany({ userId });
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

  const accessToken = issueAccessToken(
    { userId, email, name: result.name },
    { secret }
  );

  setCookie(event, "accessToken", accessToken, {
    httpOnly: true,
    expires: expiresAccessToken,
  });
  return { email, password };
});
