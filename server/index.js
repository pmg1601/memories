import express from 'express'
// import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/postsRoutes.js'

const app = express()
dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.get('/', (req, res) => {
    res.send('Hello to memories API')
})

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running at http://127.0.0.1:${PORT}`)
        )
    )
    .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
