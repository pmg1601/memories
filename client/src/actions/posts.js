/**
 * Actions that are performed to make an API call to deal with dataBase
 * according to action
 */

// Action creators - return an action
import { FETCH_ALL, UPDATE, CREATE, DELETE } from '../constants/actionTypes'
import * as api from '../api'

/* ----------------- Get post from backend and dispatch data ---------------- */

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()

        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        // console.log(error.message)
        console.log(error)
    }
}

/* ----------- Get post from backend using search params and tags ----------- */

// This is yet to be implemented
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const {
            data: { data },
        } = await api.fetchPostsBySearch(searchQuery)

        // console.log('This is data', data)
    } catch (error) {
        console.log(error)
    }
}

/* ------------------------------ Create a post ----------------------------- */

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

/* ------------------------------ Update a post ----------------------------- */

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.error(error)
    }
}

/* ------------------------------ Delete a post ----------------------------- */

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

/* -------------------------- Like / dislike a post ------------------------- */

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// These actions returns modified data and dispatch a suitable action to reducers.
