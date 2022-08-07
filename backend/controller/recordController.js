const asyncHandler = require("express-async-handler");
const Record = require("../models/recordModel");
// @desc:       Get record from database
// @route:      GET /admin/:id
// @access      Private
const getRecord = asyncHandler(async (req, res) => { 
  const record = await Record.find({
    doc_date: { $eq: req.params.doc_date },
  }).exec();
  if (!record) {
    res.status(400);
    throw new Error("Record not found");
  } else {
    res.status(200).json(record);
  }
});

const latestRecord = asyncHandler(async (req,res) => {
  const record = await Record.findOne({}, {}, { sort: { doc_date : -1 } })
  if (!record) {
    res.status(400);
    throw new Error("Record not found");
  } else {
    res.status(200).json(record);
  }
})

// @desc:       Post record/s to database
// @route:      POST /admin/import
// @access      Private
const postRecord = asyncHandler(async (req, res) => {
  if (!req.body || !req.body.player_id) {
    res.status(400);
    throw new Error("Please fillout form");
  } else {
    const record = await Record.create({
      player_id: req.body.player_id,
      ranking: req.body.ranking,
      record_high: req.body.record_high,
      date: req.body.date,
      hard: req.body.hard,
      hard_high: req.body.hard_high,
      date1: req.body.date1,
      grass: req.body.grass,
      grass_high: req.body.grass_high,
      date2: req.body.date2,
      clay: req.body.clay,
      clay_high: req.body.clay_high,
      date3: req.body.date3,
      last_active: req.body.last_active,
      atp: req.body.atp,
      doc_date: req.body.doc_date,
    });
    res.status(200).json(record);
  }
});

// @desc:       Update individual record with the id of :id
// @route:      UPDATE /admin/:doc_date/:id
// @access      Private
const updateRecord = asyncHandler(async (req, res) => {
  const record = await Record.findById(req.params.id); 
  if (!record) {
    res.status(400);
    throw new Error("Record not found");
  } else {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    console.log(req.body);
    res.status(200).json(updatedRecord);
  }
});

// @desc:       Delete individual record with the id of :id
// @route:      DELETE /admin/:doc_date/:id
// @access      Private
const deleteRecord = asyncHandler(async (req, res) => {
  const record = await Record.findById(req.params.id);  
  if (!record) {
    res.status(400);
    throw new Error("Record not found");
  } else {
    await record.remove();
    res.status(200).json({ id: req.params.id, message: 'deleted' });
  }
});

// @desc:       Delete whole record with the id of :id
// @route:      DELETE /admin/:doc_date
// @access      Private
const deleteWholeRecord = asyncHandler(async (req, res) => {
    const recordsToDelete = await Record.find({
        doc_date: { $eq: req.params.doc_date }})
    if (!recordsToDelete) {
      res.status(400);
      throw new Error("Record not found");
    } else {
    recordsToDelete.forEach(record => {
        record.remove();
    }); 
      res.status(200).json({ id: req.params.doc_date, message: 'deleted' });
    }
  });

module.exports = {
  getRecord,
  postRecord,
  updateRecord,
  deleteRecord,
  deleteWholeRecord,
  latestRecord
};
