import { connect } from 'mongoose'

export default defineNitroPlugin(async () => {
  const { mongoUri } = useRuntimeConfig()
  await connect(mongoUri)
  console.info('Connected to MongoDB 🚀', mongoUri)
})
