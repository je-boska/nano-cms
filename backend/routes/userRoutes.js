import express, { response } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc    Fetch all users
// @route   GET /api/users
// @access  Public
router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
  })
)

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })
)

// @desc    Register user
// @route   POST /api/users/
// @access  Public
router.post(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
)

router.delete(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

export default router
