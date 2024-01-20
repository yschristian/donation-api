const express = require('express')
const router = express.Router()

const donationController = require('../Controllers/donationController')

router.post('/register', donationController.createDonation)
router.get('/all', donationController.getAllDonations)
router.get('/single/:id', donationController.getDonationById)

module.exports = router 