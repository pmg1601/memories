/**
 * All the route action for posts (/posts) and functionality controllers.
 * All requests on these paths will be handled using controllers and middlewares mentioned.
 */

import express from 'express'
import {
    getPosts,
    getPostsBySearch,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from '../controllers/postsController.js'

import auth from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

// router.get('/:id', getPost)

export default router
