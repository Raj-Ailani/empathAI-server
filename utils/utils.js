import config from '../config/index.js'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcryptjs'


// hash password
export const hashText = async text => {
  try {
    const saltRounds = 10
    const hash = await bcrypt.hash(text, saltRounds)
    return hash
  } catch (error) {
    console.log(error)
  }
}

// compare hash
export const compareHash = async (text, hash) => {
  try {
    const match = await bcrypt.compare(text, hash)
    return match
  } catch (error) {
    console.log(error)
  }
}

export const generateJWTToken = async obj => {
  return (
    'Bearer ' +
    jwt.sign(obj, config.SECRETS.JWT, {
      expiresIn: config.SECRETS.JWTEXP
    })
  )
}

export const verifyJWTToken = token => {
  try {
    return jwt.verify(token, config.SECRETS.JWT)
  } catch (error) {
    console.log(error)
    return false
  }
}
