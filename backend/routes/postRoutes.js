import express, { Router } from 'express'
import Post from '../models/postModel.js'

const router = express.Router()

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
router.get('/', async (req, res) => {
  const posts = await Post.find({})

  res.json(posts)
})
// @desc    Fetch post by ID
// @route   GET /api/posts/:id
// @access  Public
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    res.json(post)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a post
// @route   POST /api/posts
// @access  Public for now
router.post('/', async (req, res) => {
  const { title, text } = req.body

  const post = new Post({
    title,
    text,
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc    Delete a post
// @route   DELETE /api/post
// @access  Public
router.delete('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    await post.remove()
    res.json({ message: 'Post deleted' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Update a post
// @route   DELETE /api/post
// @access  Public
router.put('/:id', async (req, res) => {
  const { title, text } = req.body

  const post = await Post.findById(req.params.id)

  if (post) {
    post.title = title
    post.text = text

    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export default router
