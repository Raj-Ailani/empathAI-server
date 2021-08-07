import { Router } from 'express'
import { findUser } from '../controllers/userControllers.js'

import {
  created,
  senderror,
  unauthorized,
  ok,
  conflict
} from '../utils/express-helper.js'
import {admin} from '../utils/auth.js'

const router = Router()

router.use(created, senderror, unauthorized, ok, conflict)
router.get('/', admin,findUser)


export default router
