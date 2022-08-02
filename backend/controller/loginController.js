const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/loginModel')

// @desc:       Register a new user
// @route:      POST /admin-login/
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all inputs')
    }
    // Check if user exists
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10) //Default
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})



// @desc:       Auth a user
// @route:      POST /admin-login/login
// @access      Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //Check user email exists
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Creds')
    }

    res.json({ message: 'Login user' })
})

// @desc:       Get user data
// @route:      GET /admin-login/
// @access      Public
const getUser = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id) 
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '15d',
    })
}

module.exports = { registerUser, loginUser, getUser };