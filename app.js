const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const useroutes = require('./src/Routers/user')
const kidsroutes = require('./src/Routers/kid')


const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use('/users', useroutes)
app.use('/kids', kidsroutes)

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('database connected successfully'))
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
