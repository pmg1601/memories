/**
 * This is a main file that contains default routes, mongoDB connection
 */

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import postRoutes from './routes/postsRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
dotenv.config()

// Initial setup
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// Routes
app.use('/posts', postRoutes)
app.use('/users', userRoutes)

// When we deploy backend
app.get('/', (req, res) => {
    res.send('Hello to memories API')
})

// DataBase (MongoDB-local) Connection
const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () =>
            console.log(
                `Server running at http://127.0.0.1:${PORT}`.yellow.bold
            )
        )
        console.log(
            `\nConnected to MongoDB : ${process.env.CONNECTION_URI}`.blue
                .underline
        )
    })
    .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
