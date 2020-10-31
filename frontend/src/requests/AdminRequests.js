import axios from 'axios'

export async function createPost(token) {
  const {
    data: { _id },
  } = await axios.post(
    '/api/posts',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return _id
}

export async function deletePost(token, id) {
  await axios.delete(`/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function getAllPosts() {
  const { data } = await axios.get('/api/posts')

  return data
}
