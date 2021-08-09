import { Comments, Products } from "../models/productModel.js"


export const createProduct = async (req, res) => {
        try {
         const product = await Products.create({ ...req.body })
            
          res.ok(product)
        } catch (error) {
          console.log('Error', error)
          res.senderror(error)
        }
}

export const updateProduct = async (req, res) => {
    try {
    const productId = req.params.id
    console.log(productId)
    const product = await Products.updateOne({ _id: productId},req.body)

    res.ok(product)
    } catch (error) {
      console.log('Error', error)
      res.senderror(error)
    }
}


export const getAllProducts = async (req, res) => {
    try {
     
     const product = await Products.find({})
        
      res.ok(product)
    } catch (error) {
      console.log('Error', error)
      res.senderror(error)
    }
}

export const getProductById = async (req, res) => {
    try {
     
    const productId = req.params.id
     const product = await Products.findOne({_id:productId})
        
      res.ok(product)
    } catch (error) {
      console.log('Error', error)
      res.senderror(error)
    }
}

// Comments CURD operations ..................



export const postComment = async (req, res) => {
    try {
     const comment = await Comments.create({...req.body})   
      res.ok(comment)
    } catch (error) {
      console.log('Error', error)
      res.senderror(error)
    }
}

export const getCommentsOfProduct = async (req, res) => {
    try {
    const productId = req.params.id
     const comment = await Comments.find({product:productId})   
      res.ok(comment)
    } catch (error) {
      console.log('Error', error)
      res.senderror(error)
    }
}