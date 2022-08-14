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

const playersService = { loadPlayers };

export default playersService;
