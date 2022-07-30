const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Insert a name first.']
    },
    username: {
        type: String,
        required: [true, 'Insert a username first.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Insert a name first.']
    } 
},{
    collection: 'admin',
    timestamps: true
})

module.exports = mongoose.model('admin', adminSchema)