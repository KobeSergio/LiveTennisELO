//SERVICE IS FOR HTPP REQUEST
//SEND DATA BACK
//SEND DATA TO LOCAL STORAGE

import axios from "axios";

//const RECORD_URL = "/admin-api/";
const RECORD_URL = "http://localhost:5000/admin-api/";

//Load record,
// @http:   GET admin/:doc_date
// @res:    record: json
const loadRecord = async (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(RECORD_URL + payload.doc_date, config);

  if (response.data) {
    localStorage.setItem("record", JSON.stringify(response.data));
  }

  return response.data;
};

//Load record to latest doc_date.
// @http:   GET admin/
// @res:    user: json
const latestRecord = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadLast = await axios.get(RECORD_URL, config);
  return loadLast.data;
};

//Upload record.
// @http:   POST admin/imports
const uploadRecord = async (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const uploadedRecord = await axios.post(
    RECORD_URL + "import",
    payload,
    config
  );
  return uploadedRecord.data;
};

//Update record.
// @http:   POST admin/
// @res:    user: json
//New [patch 69.0]
const updateRecord = async (payload, token) => 
{
  const config = 
  {
    headers: 
    {
      Authorization: `Bearer ${token}`,
    },
  };

  //Update current data, current date
  const updateRecord = await axios.put
  (
    RECORD_URL + payload[0].doc_date + "/" + payload[0]._id,
    payload[1],
    config
  );

  var atp = payload[1].atp - payload[2].atp;
  var clay = payload[1].clay - payload[2].clay;
  var grass = payload[1].grass - payload[2].grass;
  var hard = payload[1].hard - payload[2].hard;
  var ranking = payload[1].ranking - payload[2].ranking;

  const futureRecord = await axios.get(RECORD_URL + "/futureRecords/" + payload[0].doc_date + "/" + payload[0].player_id, config);

  //Update future data if available
  for (var i = 0; i < futureRecord.data.length; i++)
  {
    console.log(futureRecord.data[i].doc_date + " : " + futureRecord.data[i]._id);
    const newData = 
    {
      atp: atp + futureRecord.data[i].atp,
      clay: clay + futureRecord.data[i].clay,
      grass: grass + futureRecord.data[i].grass,
      hard: hard + futureRecord.data[i].hard,
      ranking: ranking + futureRecord.data[i].ranking,
      lactive: futureRecord.data[i].lactive
    };

    await axios.put
    (
      RECORD_URL + futureRecord.data[i].doc_date + "/" + futureRecord.data[i]._id,
      newData,
      config
    );
  }

  const getall = await axios.get(RECORD_URL + payload[0].doc_date, config);

  const toReturn = [updateRecord.data, getall.data];
  //console.log(payload);
  return toReturn;
};

// OLD
/* 
  const updateRecord = async (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const updateRecord = await axios.put(
    RECORD_URL + payload[0].doc_date + "/" + payload[0]._id,
    payload[1],
    config
  );

  const getall = await axios.get(RECORD_URL + payload[0].doc_date, config);

  const toReturn = [updateRecord.data, getall.data];
  console.log(toReturn);
  return toReturn;
};
*/

//Delete all in record
// @payload:   record.doc_date
const deleteRecord = async (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(RECORD_URL + payload.doc_date, config);

  return response.data;
};

//Delete individual record
// @payload:   record._id
const deleteIndRecord = async (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    RECORD_URL + payload.doc_date + "/" + payload._id,
    config
  );

  return response.data;
};

const recordsService = {
  loadRecord,
  uploadRecord,
  deleteRecord,
  deleteIndRecord,
  latestRecord,
  updateRecord,
};

export default recordsService;
