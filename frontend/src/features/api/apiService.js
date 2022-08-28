import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const loadRecord = async (payload) => {
  const response = await axios.get(API_URL + payload.doc_date);
  if (response.data) {
    localStorage.setItem("record", JSON.stringify(response.data));
  }

  return response.data;
};

const loadData = async () => {
  const loadLast = await axios.get(API_URL + "records/");
  const loadData = await axios.get(
    API_URL + "records/" + loadLast.data.record.doc_date
  );
  let index = loadLast.data.records.indexOf(loadLast.data.record.doc_date);
  const beforeLast = await axios.get(
    API_URL + "records/" + loadLast.data.records[index - 1]
  );
  const loadPlayers = await axios.get(API_URL + "players/");
  return {
    latest: loadLast.data,
    beforeLatest: beforeLast.data,
    loadData: loadData.data,
    players: loadPlayers.data,
  };
};

const apiService = {
  loadRecord,
  loadData,
};

export default apiService;
