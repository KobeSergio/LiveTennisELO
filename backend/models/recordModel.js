const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  { 
    doc_date: String,
    player_id: String,
    name: String,
    ranking: Number,
    record_high: Number,
    date: String,
    hard: Number,
    hard_high: Number,
    date1: String,
    grass: Number,
    grass_high: Number,
    date2: String,
    clay: Number,
    clay_high: Number,
    date3: String,
    last_active: String,
    atp: Number,
    
  },
  { collection: "records", strictQuery: 'throw'}
);

module.exports = mongoose.model("records", recordSchema);
