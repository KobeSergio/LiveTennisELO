import axios from "axios";

const PLAYERS_URL = "http://localhost:5000/admin/players";

//Load record,
// @http:   GET admin/:doc_date
// @res:    record: json
const loadPlayers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(PLAYERS_URL, config);
  console.log(response.data);
  if (response.data) {
    localStorage.setItem("players", JSON.stringify(response.data));
  }

  return response.data;
};

//Load individual player,
// @http:   GET admin/players/:player_id
// @res:    player: {player,matches}json
const loadPlayer = async (player_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(PLAYERS_URL + "/" + player_id, config);
  return response.data;
};

//Update Player
// @http:   PUT admin/players/:player_id
// @res:    updatedPlayer: json
const updatePlayer = async (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const updatedPlayer = await axios.put(
    PLAYERS_URL + "/" + payload[0].player_id,
    payload[1],
    config
  );
  return updatedPlayer.data;
};

const playersService = { loadPlayers, loadPlayer, updatePlayer };

export default playersService;
