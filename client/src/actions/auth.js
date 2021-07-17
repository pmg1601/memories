/**
 * Actions that are performed to make an API call to deal with dataBase
 * according to action
 */

import { AUTH } from '../constants/actionTypes'
import * as api from '../api'

/* ----------------------------- Log in the user ---------------------------- */

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH, data })
        history.push('/')
    } catch (error) {
        console.error(error)
    }
}

/* --------------------------- Sign Up in the user -------------------------- */

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, data })
        history.push('/')
    } catch (error) {
        console.error(error)
    }
}
