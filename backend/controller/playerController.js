const asyncHandler = require("express-async-handler");
const Player = require("../models/playerModel");
const Matches = require("../models/matchModel");

// @desc:       Get players
// @route:      GET /admin/players
// @access      Private
const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find();

  if (!players) {
    res.status(400);
    throw new Error("No players found.");
  }

  res.status(200).json(players);
});

// @desc:       Post player
// @route:      POST /admin
// @access      Private
const postPlayer = asyncHandler(async (req, res) => {
  console.log(req.body.text);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text");
  }
  res.status(200).json({ message: "Post player" });
});

// @desc:       Update player with the id of :id
// @route:      UPDATE /admin/:id
// @access      Private
const updatePlayer = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update player ${req.params.id}` });
});

// @desc:       Delete player with the id of :id
// @route:      DELETE /admin/:player_id
// @access      Private
const deletePlayer = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete player ${req.params.id}` });
});

const getIndPlayer = asyncHandler(async (req, res) => {
  const player = await Player.find({ player_id: {$eq:req.params.id}});
  const matches = await Matches.find({$or: [{winner_local_id: {$eq: req.params.id}}, {loser_local_id: {$eq: req.params.id}}]})
   
  if (!player && !matches) {
    res.status(400);
    throw new Error("Data insufficient");
  }
  const container = {'player':player,'matches':matches}
  res.status(200).json(container);
});

module.exports = {
  getPlayers,
  postPlayer,
  updatePlayer,
  deletePlayer,
  getIndPlayer,
};
