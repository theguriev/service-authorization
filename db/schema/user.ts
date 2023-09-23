import { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  forgotPassword: {
    token: String,
    timestamp: Number,
  },
});

export default userSchema;
