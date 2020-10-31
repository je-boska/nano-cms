import axios from 'axios'

export async function authUser(email, password) {
  const { data } = await axios.post(
    `/api/users/login`,
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return data
}
