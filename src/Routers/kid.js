const express = require('express')
const router = express.Router()
const upload = require('../Helpers/multer')

const KidController = require('../Controllers/kidController')

router.post('/register',upload.single("photo"), KidController.createKid)
router.get('/all', KidController.getAllKids)
router.get('/single/:id', KidController.getKidById)
router.delete('/delete/:id', KidController.removeKid)

module.exports = router
