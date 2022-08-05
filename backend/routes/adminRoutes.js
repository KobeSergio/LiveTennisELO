const express = require("express");
const router = express.Router();
const {
  getRecord,
  postRecord,
  updateRecord,
  deleteRecord,
  deleteWholeRecord,
} = require("../controller/recordController");
const {
  getPlayers,
  postPlayer,
  updatePlayer,
  deletePlayer,
  getIndPlayer,
} = require("../controller/playerController");
const { protect } = require("../middleware/authMiddleware");

router.route("/players").get(getPlayers);
router
  .route("/players/:id")
  .get(getIndPlayer)
  .put(updatePlayer)
  .delete(deletePlayer);

router.route("/:doc_date").get(getRecord).delete(deleteWholeRecord);
router.route("/:doc_date/:id").put(updateRecord);
//router.route("/:id").put(updateRecord).delete(deleteRecord).post(postRecord);



module.exports = router;
