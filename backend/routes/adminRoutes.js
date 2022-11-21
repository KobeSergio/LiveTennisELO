const express = require("express");
const router = express.Router();
const {
  getRecord,
  postRecord,
  updateRecord,
  deleteRecord,
  deleteWholeRecord,
  latestRecord,
  futureRecord,
} = require("../controller/recordController");
const {
  getPlayers,
  postPlayer,
  updatePlayer,
  deletePlayer,
  getIndPlayer,
} = require("../controller/playerController");
const { updateMatch, deleteMatch } = require("../controller/matchesController");
const { protect } = require("../middleware/authMiddleware");
const { parseCSV } = require("../middleware/parseCSV");

//Players
router.route("/players").get(protect, getPlayers);
router
  .route("/players/:id")
  .get(protect, getIndPlayer)
  .put(protect, updatePlayer)
  .delete(protect, deletePlayer);

//Imports
var multer = require("multer");
var upload = multer();
//router.route("/import").post(upload.single("file"), parseCSV);

//Records
router.route("/").get(protect, latestRecord);
router
  .route("/matches/:id")
  .put(protect, updateMatch)
  .delete(protect, deleteMatch);
router
  .route("/:doc_date")
  .get(protect, getRecord)
  .delete(protect, deleteWholeRecord);
router
  .route("/:doc_date/:id")
  .put(protect, updateRecord)
  .delete(protect, deleteRecord);
router.route("/futureRecords/:doc_date/:player_id").get(protect, futureRecord);


//router.route("/:id").put(updateRecord).delete(deleteRecord).post(postRecord);

module.exports = router;
