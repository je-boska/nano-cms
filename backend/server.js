import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import { data } from './data.js'

dotenv.config()

connectDB()

const app = express()

app.get('/api/posts', (req, res) => {
  res.json(data)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
