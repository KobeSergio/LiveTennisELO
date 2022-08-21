import axios from "axios";

const PLAYERS_URL = "http://localhost:5000/admin/players";
const MATCHES_URL = "http://localhost:5000/admin/matches/";

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

const insertHighlight = async (payload, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const updatedPlayer = await axios.put(
    MATCHES_URL + payload[1],
    payload[0],
    config
  );
  return updatedPlayer.data;
};

//Update Player
// @http:   DELETE admin/players/:player_id
// @res:    message: json
const deletePlayer = async (player_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const deletedPlayer = await axios.delete(
    PLAYERS_URL + "/" + player_id,
    config
  );
  return deletedPlayer.data;
};

const playersService = {
  loadPlayers,
  loadPlayer,
  updatePlayer,
  deletePlayer,
  insertHighlight,
};

export default playersService;
