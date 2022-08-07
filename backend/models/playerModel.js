const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema(
  {
    player_id: String,
    player_name: String,
    hand: String,
    birthdate: String,
    height: Number,
    atp_id: Number,
    status: String,
    birthplace: String,
    backhand: String,
    weight: String,
    img_link: String,
    facebook: String,
    twitter: String,
    instagram: String,
    wiki: String,
    website: String,
    nicknames: String,
    favorite_surface: String,
    overall_rank: Number,
    overall_peak_rank: Number,
    overall_peak_rank_date: String,
    overall_rating: Number,
    overall_peak_rating: Number,
    overall_peak_rating_date: String,
    hard_rank: Number,
    hard_peak_rank: Number,
    hard_peak_rank_date: String,
    hard_rating: Number,
    hard_peak_rating: Number,
    hard_peak_rating_date: String,
    clay_rank: Number,
    clay_peak_rank: Number,
    clay_peak_rank_date: String,
    clay_rating: Number,
    clay_peak_rating: Number,
    clay_peak_rating_date: String,
    grass_rank: Number,
    grass_peak_rank: Number,
    grass_peak_rank_date: String,
    grass_rating: Number,
    grass_peak_rating: Number,
    grass_peak_rating_date: String,
    atp_rank: Number,
    atp_peak_rank: Number,
    atp_peak_rank_date: String,
    atp_rating: Number,
    atp_peak_rating: Number,
    atp_peak_rating_date: String,
    last_match: String,
    debut: String,
  },
  { collection: "players" }
);

module.exports = mongoose.model("players", playerSchema);
