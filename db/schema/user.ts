import { Schema } from 'mongoose'

const userSchema = new Schema({
  email: String,
  password: String,
  timestamp: Number,
  forgotPassword: {
    token: String,
    timestamp: Number
  },
  meta: {
    type: Map,
    of: Schema.Types.Mixed
  }
})

export default userSchema
