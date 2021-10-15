import express, {  Router } from 'express'
import cors from 'cors'
import request  from 'request'
// import { login, protect } from './utils/auth.js'
import {
  created,
  senderror,
  unauthorized,
  ok,
  conflict
} from './utils/express-helper.js'
import { ping } from './utils/ping.js'
import { registerUser } from './controllers/userControllers.js'
import { login, protect } from './utils/auth.js'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'

// create express server
export const app = express()

app.use(cors())
app.use(express.json());

const router = Router()

// cors configruation
router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  res.header('Access-Control-Max-Age', '1728000')
  next()
})

router.use(created, senderror, unauthorized, ok, conflict)
app.use(created, senderror, unauthorized, ok, conflict)



app.get('/api/ping', ping)
app.post('/api/register',registerUser)
app.post('/api/login', login)


app.use('/api/users',userRouter)
app.use('/api/products',productRouter)

//POC to connect node with flask server
app.get('/home', function(req, res) {
  request('http://127.0.0.1:5000/flask', function (error, response, body) {
    console.error('error:', error); // Print the error
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the data received
    res.ok(body); //Display the response on the website
    });      
});


// app.post('/api/signup', signup)



