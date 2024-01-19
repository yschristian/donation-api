const User = require('../Models/usermodel')
const bcrypt = require('bcrypt')
const sign = require('../Helpers/jwt')


class UserController {
  static async register(req, res) {
    try {
      const password = req.body.password
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
      if (!regex.test(password)) {
        return res.status(400).json({
          message:
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        })
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        phoneNumber: req.body.phoneNumber
      })
      await user.save()
      return res.status(201).json(user)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user)
        return res.status(401).json({ message: 'Invalid email or password' })
      const validated = await bcrypt.compare(req.body.password, user.password)
      if (!validated) return res.status(401).json({ message: 'Invalid email or password' })
      const accessToken = sign.sign({ id: user.id, role: user.role })
      // if (!user.isActive) {
      //   return res.status(401).json({ message: 'User account is not active' })
      // }
      return res.status(200).json({
        message: 'Successfully Logged In',
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber,
          isActive: user.isActive
        },
        token: accessToken
      })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
      if (!user) return res.status(404).json({ message: 'User not found' })
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async updateUserById(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      )
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res
        .status(200)
        .json({ message: 'User updated successfully', data: user })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async deleteUserById(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      return res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  } 3

  static async getAllUsers(req, res) {
    try {
      const users = await User.find()
      return res
        .status(200)
        .json({ message: 'Users retrieved successfully', data: users })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message })
    }
  }
  static async deactivateUser(req, res) {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      user.isActive = false
      await user.save()

      return res
        .status(200)
        .json({ message: 'User deactivated successfully', data: user })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
module.exports = UserController
