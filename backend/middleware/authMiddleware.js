const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/loginModel') 

const protect = asyncHandler(async (req, res, next) => {
    let token
    var ObjectId = require('mongoose').Types.ObjectId; 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get Token from header
            token = req.headers.authorization.split(' ')[1]

            //Verif token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token
            req.user = await User.findById(new ObjectId(decoded.id)).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }