import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'

import connectDB from './config/db.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import { urlencoded, json } from 'body-parser'

dotenv.config()

connectDB()

const app = express()

app.use(json())
app.use(urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
