const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    tourney_id: String,
    tourney_name: String,
    surface: String, 
    tourney_date: Number,
    match_num: Number,

    //Winner 
    winner_local_id: String, 
    winner_name: String,  
    winner_elo: Number, 
    winner_elo_surface: Number,
    winner_elo_gains: Number,
    winner_elo_surface_gains: Number, 
    score: String,   
    //Loser 
    loser_local_id: String, 
    loser_name: String,  
    loser_elo: Number,
    loser_elo_surface: Number,
    loser_elo_gains: Number,
    loser_elo_surface_gains: Number, 
    round: String, 
    highlight: String,
  },
  { collection: "matches" }
);

module.exports = mongoose.model("matches", playerSchema);
