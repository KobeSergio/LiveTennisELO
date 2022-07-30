const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    player_id: String,
    ranking: Number,
    record_high: Number,
    date: Date,
    hard: Number,
    hard_high: Number,
    date1: Date,
    grass: Number,
    grass_high: Number,
    date2: Date,
    clay: Number,
    clay_high: Number,
    date3: Date,
    last_active: Date,
    atp: Number,
    doc_date: Number
}, { collection: 'records' })
 

module.exports = mongoose.model("atp_records", recordSchema)