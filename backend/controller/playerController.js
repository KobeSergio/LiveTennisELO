const asyncHandler = require("express-async-handler");
const Player = require("../models/playerModel");
const Matches = require("../models/matchModel");
const Records = require("../models/recordModel");

// @desc:       Get players
// @route:      GET /admin/players
// @access      Private
const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find()
    .select(
      "player_id player_name last_match overall_peak_rating overall_peak_rating_date hard_peak_rating hard_peak_rating_date grass_peak_rating grass_peak_rating_date clay_peak_rating clay_peak_rating_date atp_peak_rating atp_peak_rating_date hard_rating clay_rating overall_rating grass_rating atp_rating"
    )
    .sort({ atp_rating: -1 });
  if (!players) {
    res.status(400);
    throw new Error("No players found.");
  }
  res.status(200).json(players);
});

const getPlayerslist = asyncHandler(async (req, res) => {
  const players = await Player.find().select("player_id player_name");

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
  const player_ids = req.query.player_ids.split(",");
  const player = await Player.find({ player_id: { $in: player_ids } });
  const records = await Records.find({ player_id: { $in: player_ids } }).select(
    "player_id ranking hard grass clay atp overall_rank hard_rank clay_rank grass_rank atp_rank doc_date age"
  );
  if (player.length !== player_ids.length || records.length === 0) {
    res.status(400);
    throw new Error("Data insufficient");
  }
  res.status(200).json({ player: player, records: records });
});

// @desc:       Get player for chart comparisons
// @route:      GET api/matches/:player_id
// @access      Public
const getPlayerH2H = asyncHandler(async (req, res) => {
  const player_ids = req.query.player_ids.split(",");
  const players = await Player.find({ player_id: { $in: player_ids } });
  const records = await Records.find({
    player_id: { $in: player_ids },
  }).select("player_id ranking doc_date");
  const h2h = await Matches.find({
    winner_local_id: { $in: player_ids },
    loser_local_id: { $in: player_ids },
  });
  res.status(200).json({ players: players, h2h: h2h, records: records });
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
  const player = Player.find({ player_id: { $eq: req.params.id } });
  const matches = Matches.aggregate([
    { $sort: { tourney_date: -1 } },
    {
      $match: {
        $or: [
          { winner_local_id: { $eq: req.params.id } },
          { loser_local_id: { $eq: req.params.id } },
        ],
      },
    },

    {
      $group: {
        _id: "$surface",
        game: {
          $push: {
            _id: "$_id",
            tourney_id: "$tourney_id",
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
        mostRecentGames: "$game",
      },
    },
  ]);
  const records = Records.find({ player_id: { $eq: req.params.id } }).select(
    "ranking hard grass clay atp overall_rank hard_rank clay_rank grass_rank atp_rank doc_date age"
  );

  const response = await Promise.all([player, matches, records]);
  if (!response) {
    res.status(400);
    throw new Error("Data insufficient");
  }
  const container = {
    player: response[0],
    matches: response[1],
    records: response[2],
  };
  res.status(200).json(container);
});

const getHotPerformance = asyncHandler(async (req, res) => {
  if (
    req.params.sortby != "overall" &&
    req.params.sortby != "hard" &&
    req.params.sortby != "grass" &&
    req.params.sortby != "clay"
  ) {
    res.status(400);
    throw new Error("Invalid surface");
  }

  //get top 10 players according to ranking where atp is not null and greater than 1000
  const players = await Player.find({
    $or: [
      {
        $and: [
          {
            atp_rating: { $ne: null, $gt: 300 },
          },
          {
            overall_rating: { $ne: null, $gt: 2500 },
          },
        ],
      },
      {
        $and: [
          {
            atp_rating: { $ne: null, $gt: 300 },
          },
          {
            hard_rating: { $ne: null, $gt: 2500 },
          },
        ],
      },
      {
        $and: [
          {
            atp_rating: { $ne: null, $gt: 300 },
          },
          {
            clay_rating: { $ne: null, $gt: 2500 },
          },
        ],
      },
      {
        $and: [
          {
            atp_rating: { $ne: null, $gt: 300 },
          },
          {
            grass_rating: { $ne: null, $gt: 2500 },
          },
        ],
      },
    ],
  })
    .select(
      "player_id player_name overall_rating hard_rating grass_rating clay_rating atp_rating"
    )
    .sort(
      req.params.sortby == "overall"
        ? { overall_rating: -1 }
        : req.params.sortby == "hard"
        ? { hard_rating: -1 }
        : req.params.sortby == "clay"
        ? { clay_rating: -1 }
        : { grass_rating: -1 }
    )
    .limit(35);

  if (!players) {
    res.status(400);
    throw new Error("Data insufficient");
  }

  //for each player in players, get the last 10 matches
  const promises = players.map(async (player) => {
    const matches = await Matches.aggregate([
      { $sort: { tourney_date: -1 } },
      {
        $match: {
          $or: [
            { winner_local_id: { $eq: player.player_id } },
            { loser_local_id: { $eq: player.player_id } },
          ],
        },
      },
      { $limit: 550 },
      {
        $group: {
          _id: player.player_id,
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
          player_name: player.player_name,
          mostRecentGames: "$game",
        },
      },
    ]);
    return matches;
  });

  const response = await Promise.all(promises);

  if (!response) {
    res.status(400);
    throw new Error("Data insufficient");
  }

  res.status(200).json(response);
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
  getPlayerslist,
  getPlayerH2H,
  getHotPerformance,
};
