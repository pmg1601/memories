import express from 'express'
import { getPosts, createPost } from '../controllers/postsController.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/posts', createPost)

export default router
