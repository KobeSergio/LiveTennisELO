//SERVICE IS FOR HTPP REQUEST
//SEND DATA BACK
//SEND DATA TO LOCAL STORAGE

import axios from "axios";

const RECORD_URL = "/admin-api/";

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
