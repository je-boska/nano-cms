const express = require('express')
const app = express()
const PORT = 5000
const data = require('./data')

app.get('/api/posts', (req, res) => {
  res.json(data)
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
