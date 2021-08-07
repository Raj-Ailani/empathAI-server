/*
    Connect to datatbase
*/
import mongoose from 'mongoose'
import config from '../config/index.js'

export const connect = (url = config.DATABASE_URL, opts = {}) => {
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  return mongoose.connect(url, { ...opts })
}
