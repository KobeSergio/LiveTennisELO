const express = require("express");
const router = express.Router();
const { getRecord, latestRecord } = require("../controller/recordController");
const {
  getPlayers,
  getPlayerRecs,
  getIndPlayer,
  getPlayerslist,
} = require("../controller/playerController");

router.route("/api/playerslist").get(getPlayerslist);
router.route("/api/players").get(getPlayers);
router.route("/api/players/compare").get(getPlayerRecs);
router.route("/api/players/:id").get(getIndPlayer);
router.route("/api/records").get(latestRecord);
router.route("/api/records/:doc_date").get(getRecord);

module.exports = router;
