export default eventHandler(async (event) => {
  const oldRefreshToken = getCookie(event, "refreshToken");
  const oldRefreshTokenDocument = await ModelToken.findOne({
    token: oldRefreshToken,
  });

  if (oldRefreshTokenDocument === null) {
    setResponseStatus(event, 404);
    return {
      error: "Refresh token not found!",
    };
  }
  const userId = oldRefreshTokenDocument.userId!;
  const user = await ModelUser.findOne({ _id: userId });
  if (user === null) {
    setResponseStatus(event, 404);
    return {
      error: "User not found!",
    };
  }

  const { save, deleteByUserId } = useTokens({
    event,
    userId,
    email: user.email!,
    name: user.name!,
  });
  await deleteByUserId();
  await save();

  return user;
});
