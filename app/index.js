const express = require('express')
const app = express()
const port = 3000
const id = Math.random().toString(36).substring(7)

app.get('/', (req, res) => {
  res.send(`Hello World! Server ID: ${id}`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})