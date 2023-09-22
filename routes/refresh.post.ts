export default eventHandler(async (event) => {
  const { secret } = useRuntimeConfig();
  const refreshToken = getCookie(event, "refreshToken");
  const oldRefreshToken = new ModelToken();

  oldRefreshToken.collection.findOne({ token: refreshToken });
  if (oldRefreshToken === null) {
    setResponseStatus(event, 404);
    return {
      error: "Refresh token not found!",
    };
  }
  const userId = oldRefreshToken.userId!;
  const token = issueRefreshToken();
  const timestamp = Date.now();
  oldRefreshToken.collection.deleteOne({ token: refreshToken });
  const newRefreshToken = new ModelToken({ userId, token, timestamp });
  const refreshTokenSaved = await newRefreshToken.save();

  const expiresRefreshToken = new Date(timestamp + 1000 * 60 * 60 * 24 * 30);
  const expiresAccessToken = new Date(timestamp + 1000 * 60 * 15);

  const oldUser = new ModelUser();
  const user = await oldUser.collection.findOne({ id: userId });
  if (user === null) {
    setResponseStatus(event, 404);
    return {
      error: "User not found!",
    };
  }

  setCookie(event, "refreshToken", refreshTokenSaved.token!, {
    httpOnly: true,
    expires: expiresRefreshToken,
  });

  const accessToken = issueAccessToken(
    { userId, email: user.email, name: user.name },
    { secret }
  );

  setCookie(event, "accessToken", accessToken, {
    httpOnly: true,
    expires: expiresAccessToken,
  });

  return user;
});
