import axios from "axios";

const port = process.env.PORT || 5000;
const API_URL = `http://localhost:${port}/api/`;

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

const drawChart = async (players) => {
  const getPlayerRecs = await axios.get(
    API_URL + "players/compare?player_ids=" + players
  );
  return {
    players: getPlayerRecs.data.player,
    records: getPlayerRecs.data.records,
  };
};
const apiService = {
  loadRecord,
  loadData,
  drawChart,
};

export default apiService;
