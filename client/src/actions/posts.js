/**
 * Actions that are performed to make an API call to deal with dataBase
 * according to action
 */

// Action creators - return an action
import {
    FETCH_ALL,
    FETCH_POST,
    UPDATE,
    CREATE,
    DELETE,
    FETCH_BY_SEARCH,
    START_LOADING,
    END_LOADING,
} from '../constants/actionTypes'
import * as api from '../api'

/* ------------ Get a single post from backend and dispatch data ------------ */

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchPost(id)

        // console.log(data)

        dispatch({ type: FETCH_POST, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

/* ---------------- Get posts from backend and dispatch data ---------------- */

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.fetchPosts(page)

        // console.log(data)

        dispatch({ type: FETCH_ALL, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

/* ----------- Get post from backend using search params and tags ----------- */

// This is yet to be implemented
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const {
            data: { data },
        } = await api.fetchPostsBySearch(searchQuery)

        dispatch({ type: FETCH_BY_SEARCH, payload: data })

        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

/* ------------------------------ Create a post ----------------------------- */

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })

        const { data } = await api.createPost(post)
        history.push(`/posts/${data._id}`)

        dispatch({ type: CREATE, payload: data })

        dispatch({ type: END_LOADING })
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
        // console.log(data)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// These actions returns modified data and dispatch a suitable action to reducers.
