import { AUTH } from '../constants/actionTypes'
import * as api from '../api'

// Log in the user
export const sigin = (formData, history) => async (dispatch) => {
    try {

        history.push('/')
    } catch (error) {
        console.error(error)
    }
}

// Sign Up in the user
export const sigup = (formData, history) => async (dispatch) => {
    try {

        history.push('/')
    } catch (error) {
        console.error(error)
    }
}