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

const latestTournament = asyncHandler(async (req, res) => {
  //get last 5 tournaments and
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
    { $sort: { tourney_date: -1 } },
    { $limit: 3 },
  ]);

  if (!tournaments) {
    res.status(400);
    throw new Error("Tournaments not found");
  }

  //sort by date and match_num
  const promises = tournaments.map(async (tournament) => {
    const matches = await Matches.aggregate([
      { $sort: { tourney_date: 1, match_num: -1 } },
      {
        $match: {
          tourney_id: { $eq: tournament.tourney_id },
        },
      },
      { $limit: 3 },
      {
        $group: {
          _id: tournament.tourney_id,
          game: {
            $push: {
              _id: "$_id",
              tourney_name: "$tourney_name",
              tourney_date: "$tourney_date",
              surface: "$surface",
              match_num: "$match_num",
              winner_local_id: "$winner_local_id", //LOCAL ID
              winner_name: "$winner_name",
              loser_local_id: "$loser_local_id", //LOCAL ID
              loser_name: "$loser_name",
              score: "$score",
              round: "$round",
              winner_elo: "$winner_elo",
              winner_elo_gains: "$winner_elo_gains",
              winner_elo_surface: "$winner_elo_surface",
              winner_elo_surface_gains: "$winner_elo_surface_gains",
              loser_elo: "$loser_elo",
              loser_elo_gains: "$loser_elo_gains",
              loser_elo_surface: "$loser_elo_surface",
              loser_elo_surface_gains: "$loser_elo_surface_gains",
              highlight: "$highlight",
            },
          },
        },
      },
      {
        $project: {
          tournament: tournament.tourney_name,
          games: "$game",
        },
      },
    ]);
    return matches;
  });

  const response = await Promise.all(promises);

  res.status(200).json(response);
});

module.exports = {
  updateMatch,
  deleteMatch,
  getTournaments,
  getTournament,
  latestTournament,
};
