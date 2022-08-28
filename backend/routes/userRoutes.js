const express = require("express");
const router = express.Router();
const { getRecord, latestRecord } = require("../controller/recordController");
const { getPlayers } = require("../controller/playerController");

router.route("/api/players").get(getPlayers);
router.route("/api/records").get(latestRecord);
router.route("/api/records/:doc_date").get(getRecord);

module.exports = router;
