const express = require('express')
const router = express.Router()
const { registerUser, getUser, loginUser } = require('../controller/loginController')
const { protect } = require('../middleware/authMiddleware')

 
router.route('/').post(protect, registerUser).get(protect, getUser)
router.route('/login').post(loginUser)

module.exports = router;