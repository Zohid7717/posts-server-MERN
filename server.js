import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'

const app = express()

config()
const PORT = process.env.PORT || 3000

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

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


