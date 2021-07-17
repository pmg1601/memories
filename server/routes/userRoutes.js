/**
 * All the route action for users (/users) and functionality actions
 */

import express from 'express'
import { signin, signup } from '../controllers/userController.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)

export default router
