import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import postRoutes from './routes/postsRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello to memories API')
})

const PORT = process.env.PORT || 5000

// mongodb+srv://pratik:pratik123@memories-cluster.kbkgr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb://localhost:27017

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
            `\nConnected to MongoDB : ${process.env.CONNECTION_URI}`.green
                .underline
        )
    })
    .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
