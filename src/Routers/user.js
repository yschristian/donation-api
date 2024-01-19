const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/usercontroller')
const { verifyToken, verifyTokenAndRole } = require('../Middleware/auth')
const validate = require('../Middleware/ValidateSchema')
const authSchema = require('../Helpers/userSchema')


router.post('/register',validate(authSchema),UserController.register)

router.post('/login', UserController.login)

router.get(
  '/single/:id',
  verifyToken,
  UserController.getUserById
)

router.put(
  '/update/:id',
  verifyToken,
  UserController.updateUserById
)

router.delete(
  '/delete/:id',
  verifyTokenAndRole(['admin']),
  UserController.deleteUserById
)

router.get(
  '/all',
  verifyTokenAndRole(['admin']),
  UserController.getAllUsers
)

router.put(
  '/deactivate/:id',
  verifyTokenAndRole(['admin']),
  UserController.deactivateUser
)

module.exports = router
