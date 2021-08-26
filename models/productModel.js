import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
      type:String,
      required:true,
    },
    avgPrice:{
      type:Number,
      required:true,
    },
    details:[{
      title:String,
      desp:String
    }]

},{
    timestamps: true
})

//TODO:Adding Sentiment field in comments which will come machine learning model

const commentSchema = new mongoose.Schema(
    {
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'products',
        required: true
      },
      
    name: {
      type:String,
      required:true,
        },
     comment:{
        type:String,
        required:true,
    },

    stars:{
        type:Number,
        required:true,
    },
    sentiment:{
        type:Boolean,
        required:true,
    },
    },
    { timestamps: true }
  )

export const Products = mongoose.model('products', productSchema)
export const Comments = mongoose.model('comments', commentSchema)