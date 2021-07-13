import express from 'express'
// import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/postsRoutes.js'

const app = express()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)

const CONNECTION_URL =
    'mongodb+srv://pratik:pratik123@memories-cluster.kbkgr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running at http://127.0.0.1:${PORT}`)
        )
    )
    .catch(() => console.log(error.message))

mongoose.set('useFindAndModify', false)
