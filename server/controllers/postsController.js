/**
 * Posts Controller that handles - create, update, delete, retrieve operations.
 * In Addition to this, it handles search by tags and keywords, like/dislike a post.
 */

import mongoose from 'mongoose'
import PostMessage from '../models/postMessageModel.js'

/* ------------------------------ Get all posts ----------------------------- */
export const getPosts = async (req, res) => {
    const { page } = req.query

    try {
        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT // Get the starting index of every page
        const total = await PostMessage.countDocuments({})

        const posts = await PostMessage.find()
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex)

        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
        })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

/* ---------------------------- Get a single post --------------------------- */
export const getPost = async (req, res) => {
    const { id } = req.params

    try {
        const post = await PostMessage.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

/* ------------------------- Get Posts by searching ------------------------- */
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query

    try {
        const title = new RegExp(searchQuery, 'i')
        const posts = await PostMessage.find({
            $or: [
                { title },
                {
                    tags: {
                        $in: tags.split(','),
                    },
                },
            ],
        })

        res.json({ data: posts })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

/* ------------------------------ Create a post ----------------------------- */
export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    })

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

/* ------------------------------ Update a post ----------------------------- */
export const updatePost = async (req, res) => {
    const { id } = req.params
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No Post With ID: ${id}`)

    const updatedPost = { ...post, _id: id }

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true })

    res.json(updatedPost)
}

/* ------------------------------ Delete a post ----------------------------- */
export const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No Post With ID: ${id}`)

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: 'Post Deleted Successfully!' })
}

/* ------------------------------- Like a post ------------------------------ */
export const likePost = async (req, res) => {
    const { id } = req.params

    if (!req.userId) return res.json({ message: 'Unaunthenticated!' })

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No Post With ID: ${id}`)

    const post = await PostMessage.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
        // Like the post
        post.likes.push(req.userId)
    } else {
        // Remove the like from the post
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
        new: true,
    })

    res.json(updatedPost)
}
