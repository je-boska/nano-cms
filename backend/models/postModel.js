import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    sections: Array,
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
