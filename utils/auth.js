import User from '../models/userModel.js'
import { compareHash, generateJWTToken, verifyJWTToken } from './utils.js'


export const login = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email })
        .lean()
        .exec()
        console.log(user)
  
      const match = await compareHash(req.body.password, user.password)
  
      if (!match) {
        return res.unauthorized('Either Username or Password is incorrect')
      }
  
      const token = await generateJWTToken({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
      })
  
      res.ok({ token: token, message: 'Logged In' })
    } catch (error) {
      console.log(error)
      res.senderror(error)
    }
  }

  // middleware
export const protect = async (req, res, next) => {
    const bearer = req.headers.authorization || req.headers.Authorization
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return res.unauthorized()
    }
    const token = bearer.split('Bearer ')[1].trim()
  
    const payload = verifyJWTToken(token)
    if (!payload) {
      return res.unauthorized()
    }
    const user = await User.findOne({ _id: payload.id })

  
    req.user = user
    next()
  }
  
 export const admin =(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
      res.senderror('Only Admin can do it')
    }
}