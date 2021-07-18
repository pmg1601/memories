/**
 * Reducer is a Function which accepts a state and actions, then
 * based on action something has to be done!
 *
 * Reducers get data from actions which gets data from API and send it over to
 * respective components for further use.
 */

import {
    FETCH_ALL,
    FETCH_POST,
    FETCH_BY_SEARCH,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    START_LOADING,
    END_LOADING,
} from '../constants/actionTypes'

/* -------------------------------------------------------------------------- */

const postReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }

        case END_LOADING:
            return { ...state, isLoading: false }

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }

        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload }

        case FETCH_POST:
            return { ...state, post: action.payload }

        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] }

        case UPDATE:
        case LIKE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            }

        case DELETE:
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            }

        default:
            return state
    }
}

export default postReducer
