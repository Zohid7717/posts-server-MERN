import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express()

config()
const PORT = process.env.PORT || 3000

//Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))


//Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

async function start() {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URL, {
        useNewUrlParser: true
      }
    )
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`)
    })
    console.log(`MongoDB connected to: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

start()


