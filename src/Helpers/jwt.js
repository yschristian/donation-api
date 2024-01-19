const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h"
  })
const verify = (payload) => jwt.verify(payload, process.env.JWT_SECRET)

module.exports = {
  sign,
  verify
}