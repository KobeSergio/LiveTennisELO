//SERVICE IS FOR HTPP REQUEST
//SEND DATA BACK
//SEND DATA TO LOCAL STORAGE

import axios from "axios";

const RECORD_URL = "http://localhost:5000/admin/";

//Load record, if no id presented, redirect to latest doc_date.
// @http:   GET admin/ or GET admin/:doc_date
// @res:    user: json
const loadRecord = async (payload,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
   
  const response = await axios.get(RECORD_URL+payload.doc_date, config);

  if (response.data) {
    localStorage.setItem("record", JSON.stringify(response.data));
  }

  return response.data;
};
 
//Delete all in record
// @payload:   record.doc_date
const deleteRecord = async (payload,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
   
  const response = await axios.delete(RECORD_URL+payload.doc_date, config);
 
  return response.data;
};

//Delete individual record
// @payload:   record._id 
const deleteIndRecord = async (payload,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
   
  console.log(RECORD_URL+payload.doc_date+'/'+payload._id)
  const response = await axios.delete(RECORD_URL+payload.doc_date+'/'+payload._id, config); 
  return response.data;
};

const recordsService = {
  loadRecord, 
  deleteRecord,
  deleteIndRecord
};

export default recordsService;
