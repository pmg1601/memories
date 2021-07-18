/**
 * API calls from front-end to back-end
 */

import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })
// const API = axios.create({
//     baseURL: 'https://memories-are-best.herokuapp.com/',
// })

// Will happen before all the reqests
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem('profile')).token
        }`
    }

    return req
})

// const url = 'https://make-memories-project.herokuapp.com/posts'
// const url = 'http://localhost:5000/posts'

/* -------------------------------------------------------------------------- */
/*                               Posts API calls                              */
/* -------------------------------------------------------------------------- */

// Fetch Posts
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)

// Fetch Post
export const fetchPost = (id) => API.get(`/posts/${id}`)

// Fetch posts using seach params and tags
export const fetchPostsBySearch = (searchQuery) =>
    API.get(
        `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
            searchQuery.tags
        }`
    )

// Create a post
export const createPost = (newPost) => API.post('/posts', newPost)

// Update a post
export const updatePost = (id, updatedPost) =>
    API.patch(`/posts/${id}`, updatedPost)

// Delete a post (DELETE)
export const deletePost = (id) => API.delete(`/posts/${id}`)

// Like/Dislike a post (PATCH)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

/* -------------------------------------------------------------------------- */
/*                               User API calls                               */
/* -------------------------------------------------------------------------- */

// Sign in the user
export const signIn = (formData) => API.post('/users/signin', formData)

// Sign up the user
export const signUp = (formData) => API.post('/users/signup', formData)
