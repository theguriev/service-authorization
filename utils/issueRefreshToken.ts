import { v4 } from 'uuid'
import passwordHash from './passwordHash'

const issueRefreshToken = () => passwordHash(v4())

export default issueRefreshToken
