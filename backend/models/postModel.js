import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    sections: Number,
    title: String,
    text: String,
    image: String,
    titleTwo: String,
    textTwo: String,
    imageTwo: String,
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
