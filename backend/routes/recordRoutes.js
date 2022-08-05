const express = require("express");
const router = express.Router();
const {
  getRecord,
  postRecord,
  updateRecord,
  deleteRecord,
} = require("../controller/recordController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:id").get(getRecord);
//router.route("/:id").put(updateRecord).delete(deleteRecord).post(postRecord);

module.exports = router;
