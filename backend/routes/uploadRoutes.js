import path from 'path'
import express from 'express'

import { multerUploads, parser } from '../middleware/multer.js'
import { uploader, cloudinaryConfig } from '../config/cloudinaryConfig.js'

const router = express.Router()

const __dirname = path.resolve()

router.use('*', cloudinaryConfig)

router.use('/', express.static(path.join(__dirname, '/uploads')))

router.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'))
)

router.post('/', multerUploads, (req, res) => {
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

export default router
