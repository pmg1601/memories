/**
 *  Auth Middle Ware
 *  User clicks a like button => middleware authorization (next) => like controller
 */

import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

// Check if user is authorized
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500

        let decodedData

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.MONGO_SECRET) // This is form login

            req.userId = decodedData?.id // Add userId to req
        } else {
            decodedData = jwt.decode(token) // This is google login
            req.userId = decodedData?.sub
        }

        next() // next - Do something and move to the next thing
    } catch (error) {
        console.log(error)
    }
}

export default auth
