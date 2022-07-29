const mongoose = require('mongoose') 
 
module.exports = mongoose.model('players', new mongoose.Schema({ },{collection:'players'}))