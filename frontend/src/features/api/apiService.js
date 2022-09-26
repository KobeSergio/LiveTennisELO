import axios from "axios";

const port = process.env.PORT || 5000;
//const API_URL = `/api/`;
const API_URL = `http://localhost:5000/api/`;
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

const loadPlayers = async () => {
  const loadPlayers = await axios.get(API_URL + "players/");
  return loadPlayers.data;
};

const loadPlayerList = async () => {
  const loadPlayerList = await axios.get(API_URL + "playerslist/");
  return loadPlayerList.data;
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

const loadPlayer = async (player_id) => {
  const player = await axios.get(API_URL + "players/" + player_id);

  var matchContainer = [];

  if (player.data.matches.length != 0) {
    player.data.matches.forEach((surface) => {
      surface.mostRecentGames.forEach((game) => {
        matchContainer.push(game);
      });
    });
  }

  return {
    player: player.data.player,
    matches: matchContainer,
    records: player.data.records,
  };
};
const apiService = {
  loadRecord,
  loadData,
  drawChart,
  loadPlayer,
  loadPlayerList,
  loadPlayers,
};

export default apiService;
