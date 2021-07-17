/**
 * Reducer is a Function which accepts a state and actions, then
 * based on action something has to be done!
 *
 * Reducers get data from actions which gets data from API and send it over to
 * respective components for further use.
 */

import { AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            console.log(action?.data)

            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }

        case LOGOUT:
            localStorage.removeItem('profile')
            return { ...state, authData: null }

        default:
            return state
    }
}

export default authReducer
