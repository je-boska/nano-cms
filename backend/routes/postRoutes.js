import express, { Router } from 'express'
import Post from '../models/postModel.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const posts = await Post.find({})

  res.json(posts)
})

router.post('', async (req, res) => {
  const { title, text } = req.body

  const post = new Post({
    title,
    text,
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

export default router
