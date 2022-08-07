const express = require("express");
const router = express.Router();
const {
  getRecord,
  postRecord,
  updateRecord,
  deleteRecord,
  deleteWholeRecord,
  latestRecord
} = require("../controller/recordController");
const {
  getPlayers,
  postPlayer,
  updatePlayer,
  deletePlayer,
  getIndPlayer,
} = require("../controller/playerController");
const { protect } = require("../middleware/authMiddleware");

router.route("/players").get(protect, getPlayers);
router
  .route("/players/:id")
  .get(protect, getIndPlayer)
  .put(protect, updatePlayer)
  .delete(protect, deletePlayer);

router.route("/").get(protect, latestRecord);

router
  .route("/:doc_date")
  .get(protect, getRecord)
  .delete(protect, deleteWholeRecord);

router
  .route("/:doc_date/:id")
  .put(protect, updateRecord)
  .delete(protect, deleteRecord);
//router.route("/:id").put(updateRecord).delete(deleteRecord).post(postRecord);

module.exports = router;
