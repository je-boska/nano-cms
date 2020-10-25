import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'

import connectDB from './config/db.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'

import { multerUploads, parser } from './middleware/multer.js'
import { uploader, cloudinaryConfig } from './config/cloudinaryConfig.js'
import { urlencoded, json } from 'body-parser'

dotenv.config()

connectDB()

const app = express()

// app.use(express.json())
app.use(json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('*', cloudinaryConfig)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

const __dirname = path.resolve()

app.use('/api/upload', express.static(path.join(__dirname, '/uploads')))
app.use(urlencoded({ extended: false }))

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'))
)

app.post('/api/upload', multerUploads, (req, res) => {
  const file = parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  ).content
  if (req.file) {
    return uploader
      .upload(file)
      .then(result => {
        const image = result.url
        return res.status(200).json({
          message: 'The image was successfully uploaded to cloudinary.',
          data: image,
        })
      })
      .catch(err =>
        res.status(400).json({
          message: 'Something went wrong while processing the request.',
          data: err,
        })
      )
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
