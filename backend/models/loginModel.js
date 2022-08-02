const mongoose = require('mongoose')

const loginSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Insert a name first.']
    },
    email: {
        type: String,
        required: [true, 'Insert a username first.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Insert a name first.']
    } 
},{
    collection: 'login',
    timestamps: true
})

module.exports = mongoose.model('login', loginSchema)