import User from '../models/userModel.js'
import genrateToken from '../utils/generateToken.js'
import asynHandler from 'express-async-handler'


//@desp   Register a new user
//@route    POST /api/users
//@access   Public  
export const registerUser = async (req, res) => {
        try {
          // TODO: add validation and deconstruct
          await User.create({ ...req.body })
      
          res.ok('User Registered')
        } catch (error) {
          console.log('Error', error)
          res.senderror(error)
        }
}

export const findUser = async (req,res) => {
    try {
        const user = await User.find({})
        res.ok(user)
    } catch (error) {
        console.log('Error',error)
        res.senderror(error)
        
    }
}