import { Comments, Products } from "../models/productModel.js"
import axios from "axios"
import moment from 'moment'
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
     
     const product = await Products.find({isDeleted:false})
        
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
      var config = {
        headers: {
            'Content-Length': 0,
            'Content-Type': 'text/plain'
        }
    };
    const body = req.body
 
    const flask = await axios.post('http://127.0.0.1:5000/sentiment',body.comment, config)
    body.sentiment = flask.data
    
     const comment = await Comments.create({...body})   
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
     .populate('user','name')
      .sort({createdAt:-1})
      res.ok(comment)
    } catch (error) {
      console.log('Error', error)
      res.senderror(error)
    }
}

export const getProductReport = async (req, res) => {
  try {
  let response = {}
   let positiveComment = []
   let negativeComment = []

    const productId = req.params.id
   const comment = await Comments.find({product:productId})
   const commentCount = await Comments.find({product:productId}).count()

  comment.map(c =>{
    if(c.sentiment){
      positiveComment.push(c)
    }
    else{
      negativeComment.push(c)
    }
  })
  const positiveCount = positiveComment.length
  const negativeCount = negativeComment.length

  response.positiveCount = positiveCount
  response.negativeCount = negativeCount

  response.totalCount = commentCount
  response.positiveComment = positiveComment
  response.negativeComment = negativeComment

    res.ok(response)
  } catch (error) {
    console.log('Error', error)
    res.senderror(error)
  }
}

export const getNumberOfCommentByDate = async (req, res) => {
  try {
  let response = []
  let allDates = []
  const productId = req.params.id
  const comments = await Comments.find({product:productId}).sort({createdAt:1})

  const oldestDate = comments[0].createdAt  
  const latestDate = new Date()
  
  for (var i=0; oldestDate <= latestDate; oldestDate.setDate(oldestDate.getDate() + 1), i++) {
    allDates.push(new Date(oldestDate));
    }
  
   await Promise.all(allDates.map(async (date) =>{
  
   let arr =[]
    const today = moment(date).startOf('day')
    const arrayDate = date.getDate() + '-' +date.getMonth()+'-' + date.getFullYear()  
   const dateComment = await Comments.find({product:productId,createdAt:{
    $gte: today.toDate(),
    $lte: moment(today).endOf('day').toDate()
  }}).countDocuments()
  arr.push(arrayDate)
  arr.push(dateComment)
  console.log(arr)
  response.push(arr)
  }))
    res.ok(response)
  } catch (error) {
    console.log('Error', error)
    res.senderror(error)
  }
}