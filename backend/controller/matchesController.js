const asyncHandler = require("express-async-handler");
const Matches = require("../models/matchModel");

// @desc:       Update individual plyaer with the id of :id
// @route:      UPDATE /admin/players/:player_id
// @access      Private
const updateMatch = asyncHandler(async (req, res) => {
  const match = await Matches.findByIdAndUpdate(req.params.id, req.body);
  if (!match) {
    res.status(400);
    throw new Error("Player not found");
  }
  console.log(match);
  res.status(200).json(match);
});

module.exports = {
  updateMatch,
};
