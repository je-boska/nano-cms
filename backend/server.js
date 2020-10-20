import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import Post from './models/post.js'

import { data } from './data.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find({})

  res.json(posts)
})

app.post('/api/posts', async (req, res) => {
  const { title, text } = req.body

  const post = new Post({
    title,
    text,
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
