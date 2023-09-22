import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export default eventHandler(async (event) => {
  const { email, password: purePassword } = await readValidatedBody(
    event,
    bodySchema.parse
  );
  const password = passwordHash(purePassword);
  const user = new ModelUser({ email, password });
  console.log("pass", email, password);
  const result = await user.collection.findOne({ email, password });
  if (result === null) {
    setResponseStatus(event, 403);
    return {
      error: "Wront password or email!",
    };
  }
  return { email, password };
});
