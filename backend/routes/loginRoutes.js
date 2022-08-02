const express = require('express')
const router = express.Router()
const { registerUser, getUser, loginUser } = require('../controller/loginController')
const { protect } = require('../middleware/authMiddleware')


router.get('/', protect, getUser)
router.route('/').post(registerUser)
router.route('/login').post(loginUser)

module.exports = router;