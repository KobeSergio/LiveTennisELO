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

const deleteMatch = asyncHandler(async (req, res) => {
  const match = await Matches.findByIdAndDelete(req.params.id);
  if (!match) {
    res.status(400);
    throw new Error("Match not found");
  }
  res.status(200).json({ message: "Match Deleted" });
});

const getTournaments = asyncHandler(async (req, res) => {
  const tournaments = await Matches.aggregate([
    {
      $group: {
        _id: "$tourney_id",
        first: {
          $last: "$$ROOT",
        },
      },
    },
    {
      $project: {
        _id: 0,
        tourney_id: "$first.tourney_id",
        tourney_name: "$first.tourney_name",
        tourney_date: "$first.tourney_date",
        games: "$first.match_num",
        surface: "$first.surface",
      },
    },
  ]);

  if (!tournaments) {
    res.status(400);
    throw new Error("Tournaments not found");
  }
  res.status(200).json(tournaments);
});

const getTournament = asyncHandler(async (req, res) => {
  const tournament = await Matches.find({ tourney_id: { $eq: req.params.id } });

  if (!tournament) {
    res.status(400);
    throw new Error("Tournament not found");
  }
  res.status(200).json(tournament);
});

module.exports = {
  updateMatch,
  deleteMatch,
  getTournaments,
  getTournament,
};
