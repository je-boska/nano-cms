import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/posts', postRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
