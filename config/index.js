import 'dotenv/config'

const config = {
  SECRETS: {
    JWT: process.env.JWT_SECRET,
    JWTEXP: process.env.JWT_EXPIRY_DATE
  },
  DEBUG: true,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
}

export default config