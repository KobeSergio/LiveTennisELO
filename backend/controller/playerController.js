const asyncHandler = require("express-async-handler");
const Player = require("../models/playerModel");
const Matches = require("../models/matchModel");
const Records = require("../models/recordModel");

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

// @desc:       Get player for chart comparisons
// @route:      GET api/players/:player_id
// @access      Public
const getPlayerRecs = asyncHandler(async (req, res) => {
  const player = await Player.find({ player_id: { $eq: req.params.player_id } });
  const records = await Records.find({ player_id: { $eq: req.params.player_id } });
  if (player.length === 0 && records.length === 0) {
    res.status(400);
    throw new Error("Data insufficient");
  }
  res.status(200).json({ player: player, records: records });
});

// @desc:       Post player
// @route:      POST /admin
// @access      Private
const postPlayer = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text");
  }
  res.status(200).json({ message: "Post player" });
});

// @desc:       Update individual plyaer with the id of :id
// @route:      UPDATE /admin/players/:player_id
// @access      Private
const updatePlayer = asyncHandler(async (req, res) => {
  const updatedPlayer = await Player.findOneAndUpdate(
    { player_id: { $eq: req.params.id } },
    req.body,
    { new: true }
  );
  if (!updatedPlayer) {
    res.status(400);
    throw new Error("Player not found");
  } else {
    res.status(200).json(updatedPlayer);
  }
});

const getIndPlayer = asyncHandler(async (req, res) => {
  const player = await Player.find({ player_id: { $eq: req.params.id } });
  const matches = await Matches.find({
    $or: [
      { winner_local_id: { $eq: req.params.id } },
      { loser_local_id: { $eq: req.params.id } },
    ],
  });
  const records = await Records.find({ player_id: { $eq: req.params.id } });

  if (!player && !matches && !records) {
    res.status(400);
    throw new Error("Data insufficient");
  }
  const container = { player: player, matches: matches, records: records };
  res.status(200).json(container);
});

// @desc:       Delete player with the id of :id
// @route:      DELETE /admin/players/:player_id
// @access      Private
const deletePlayer = asyncHandler(async (req, res) => {
  const playertoDelete = await Player.findOneAndDelete({
    player_id: { $eq: req.params.id },
  });
  if (!playertoDelete) {
    res.status(400);
    throw new Error("Record not found");
  } else {
    res
      .status(200)
      .json({ id: req.params.id, message: `Delete player ${req.params.id}` });
  }
});

module.exports = {
  getPlayers,
  postPlayer,
  updatePlayer,
  deletePlayer,
  getIndPlayer,
  getPlayerRecs,
};
