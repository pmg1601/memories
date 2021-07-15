import express from 'express'
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from '../controllers/postsController.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)

export default router
