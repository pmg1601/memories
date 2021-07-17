/**
 * Reducer is a Function which accepts a state and actions, then
 * based on action something has to be done!
 *
 * Reducers get data from actions which gets data from API and send it over to
 * respective components for further use.
 */

import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
} from '../constants/actionTypes'

/* -------------------------------------------------------------------------- */

const postReducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload

        case CREATE:
            return [...posts, action.payload]

        case UPDATE:
        case LIKE:
            return posts.map((post) =>
                post._id === action.payload._id ? action.payload : post
            )

        case DELETE:
            return posts.filter((post) => post._id !== action.payload)

        default:
            return posts
    }
}

export default postReducer