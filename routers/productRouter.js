import { Router } from 'express'
import { createProduct, getAllProducts, getCommentsOfProduct, getProductById, postComment, updateProduct } from '../controllers/productControllers.js'
import { admin, protect } from '../utils/auth.js'

import {
  created,
  senderror,
  unauthorized,
  ok,
  conflict
} from '../utils/express-helper.js'

const router = Router()

router.use(created, senderror, unauthorized, ok, conflict)
router.post('/',admin,createProduct)
router.put('/:id',admin,updateProduct)
router.get('/:id',getProductById)
router.get('/',getAllProducts)

//Comments Router .....
router.post('/comment',protect,postComment)
router.get('/comment/:id',getCommentsOfProduct)


export default router
