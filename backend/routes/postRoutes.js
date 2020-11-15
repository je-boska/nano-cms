import express from 'express'
import Post from '../models/postModel.js'
import { protect } from '../middleware/authMiddleware.js'
import pkg from 'cloudinary'
const { uploader } = pkg

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
    throw new Error('Post not found')
  }
})

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
router.post('/', protect, async (req, res) => {
  const { sections, position } = req.body

  const post = new Post({
    sections,
    position,
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc    Delete a post, and delete images from Cloudinary
// @route   DELETE /api/post
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    await post.remove()
    res.json({ message: 'Post deleted' })
    if (post.image) {
      const { image } = post
      const imagePublicId = image.slice(-24, -4)

      uploader.destroy(imagePublicId, (err, res) => {
        console.log(err, res)
      })
    }
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Update a post, delete old image from Cloudinary if changed
// @route   DELETE /api/post
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { sections, position } = req.body
  const post = await Post.findById(req.params.id)

  if (post) {
    post.sections = sections
    post.position = position
    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

export default router
