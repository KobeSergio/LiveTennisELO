import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const loadRecord = async (payload) => {
  const loadData = await axios.get(API_URL + "records/" + payload);
  return {
    loadData: loadData.data,
  };
};

const loadData = async () => {
  const loadLast = await axios.get(API_URL + "records/");
  const loadData = await axios.get(
    API_URL + "records/" + loadLast.data.record.doc_date
  ); 
  const loadPlayers = await axios.get(API_URL + "players/");
  return {
    latest: loadLast.data,
    loadData: loadData.data,
    players: loadPlayers.data,
  };
};

const apiService = {
  loadRecord,
  loadData,
};

export default apiService;
