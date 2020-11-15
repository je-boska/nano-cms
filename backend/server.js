import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'

import connectDB from './config/db.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import pkg from 'body-parser'
const { urlencoded, json } = pkg
import { cloudinaryConfig } from './config/cloudinaryConfig.js'

dotenv.config()

connectDB()

const app = express()

app.use(json())
app.use(urlencoded({ extended: false }))
app.use('*', cloudinaryConfig)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
