const asyncHandler = require("express-async-handler");
const Record = require("../models/recordModel");
const { EOL } = require("os");
const { parse } = require("fast-csv");
const csv = require("csvtojson");

const parseCSV = asyncHandler(async (req, res, next) => {
  const {
    file,
    body: { name },
  } = req;

  if (file.mimetype != "text/csv") {
    next(new Error("Invalid file type"));
  }

  console.log(file);
  csv()
    .fromString(file.buffer.toString())
    .then((jsonObj) => {
      console.log(jsonObj);
      //the jsonObj will contain all the data in JSONFormat.
      //but we want columns Test1,Test2,Test3,Test4,Final data as number .
      //becuase we set the dataType of these fields as Number in our mongoose.Schema().
      //here we put a for loop and change these column value in number from string using parseFloat().
      //here we use parseFloat() beause because these fields contain the float values.
    });
  res.status(200).json(req.file);
});

module.exports = { parseCSV };
