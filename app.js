const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const useroutes = require('./src/Routers/user')
const kidsroutes = require('./src/Routers/kid')
const connectDB = require('./src/db/connect')
const app = express()
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
