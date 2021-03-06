import path from 'path'
import express from 'express'

import { protect } from '../middleware/authMiddleware.js'

import { multerUploads, parser } from '../middleware/multer.js'
import pkg from 'cloudinary'
const { uploader } = pkg

const router = express.Router()

const __dirname = path.resolve()

router.use('/', express.static(path.join(__dirname, '/uploads')))

router.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'))
)

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
router.post('/', multerUploads, protect, (req, res) => {
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

// @desc    Delete image
// @route   DELETE /api/upload/:id
// @access  Private
router.delete('/:id', protect, (req, res) => {
  uploader.destroy(req.params.id, (err, res) => {
    console.log(res, err)
  })
})

export default router
