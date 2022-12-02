import axios from "axios";

const port = process.env.PORT || 5000;
//const PLAYERS_URL = `/admin-api/players`;
//const MATCHES_URL = `/admin-api/matches/`;
//const TOURNEY_URL = `/admin-api/tournament/`;

const PLAYERS_URL = `http://localhost:5000/admin-api/players`;
const MATCHES_URL = `http://localhost:5000/admin-api/matches/`;
const TOURNEY_URL = `http://localhost:5000/admin-api/tournament/`;

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
  const player = await axios.get(PLAYERS_URL + "/" + player_id, config);
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
  const highlight = await axios.put(
    MATCHES_URL + payload[1],
    payload[0],
    config
  );
  return highlight.data;
};

const updateMatch = async (payload, token) => 
{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const updatedMatch = await axios.put(
    MATCHES_URL + payload[0],
    payload[1],
    config
  );

  console.log(payload[1]);

  if (payload[1]['dynamic'])
  {
    const futureRecord = await axios.get(MATCHES_URL + "futureRecordTourney/" + payload[2].tourney_date, config);
    var winner_elo = payload[1].winner_elo - payload[2].winner_elo;
    var winner_elo_surface = payload[1].winner_elo_surface - payload[2].winner_elo_surface;
    var loser_elo = payload[1].loser_elo - payload[2].loser_elo;
    var loser_elo_surface = payload[1].loser_elo_surface - payload[2].loser_elo_surface;

    for (var i = 0; i < futureRecord.data.length; i++)
    {

        console.log(payload[2]['loser_local_id'] + " == " + futureRecord.data[i]['winner_local_id']);

      if (payload[0] != futureRecord.data[i]['_id'])
      {
        if (payload[2]['loser_local_id'] == futureRecord.data[i]['loser_local_id'])
        {
          const newData = 
          {
            loser_elo: loser_elo + futureRecord.data[i]['loser_elo'],
          };

          await axios.put(
            MATCHES_URL + futureRecord.data[i]['_id'],
            newData,
            config
          );

          //Surface
          if (payload[2]['surface'] == "Carpet" || payload[2]['surface'] == "Hard" 
            && futureRecord.data[i]['surface'] == "Carpet" || futureRecord.data[i]['surface'] == "Hard")
          {
            const newData = 
            {
              loser_elo_surface: loser_elo_surface + futureRecord.data[i]['loser_elo_surface']
            };

            await axios.put(
              MATCHES_URL + futureRecord.data[i]['_id'],
              newData,
              config
            );
          }
          else if (payload[2]['surface'] == futureRecord.data[i]['surface'])
          {
            const newData = 
            {
              loser_elo_surface: loser_elo_surface + futureRecord.data[i]['loser_elo_surface']
            };

            await axios.put(
              MATCHES_URL + futureRecord.data[i]['_id'],
              newData,
              config
            );
          }
        }
        else if (payload[2]['loser_local_id'] == futureRecord.data[i]['winner_local_id'])
        {
          const newData = 
          {
            winner_elo: loser_elo + futureRecord.data[i]['winner_elo'],
          };
          await axios.put(
            MATCHES_URL + futureRecord.data[i]['_id'],
            newData,
            config
          );

          if (payload[2]['surface'] == "Carpet" || payload[2]['surface'] == "Hard" 
            && futureRecord.data[i]['surface'] == "Carpet" || futureRecord.data[i]['surface'] == "Hard")
          {
            const newData = 
            {
              winner_elo_surface: loser_elo_surface + futureRecord.data[i]['winner_elo_surface']
            };

            await axios.put(
              MATCHES_URL + futureRecord.data[i]['_id'],
              newData,
              config
            );
          }
          else if (payload[1]['surface'] == futureRecord.data[i]['surface'])
          {
            const newData = 
            {
              winner_elo_surface: loser_elo_surface + futureRecord.data[i]['winner_elo_surface']
            };

            await axios.put(
              MATCHES_URL + futureRecord.data[i]['_id'],
              newData,
              config
            );
          }
        }

        //Winner elo
        if (payload[1]['winner_local_id'] == futureRecord.data[i]['winner_local_id'])
        {
          const newData = 
          {
            winner_elo: winner_elo + futureRecord.data[i]['winner_elo']
          };

          await axios.put(
            MATCHES_URL + futureRecord.data[i]['_id'],
            newData,
            config
          );

          if (payload[2]['surface'] == "Carpet" || payload[2]['surface'] == "Hard" 
            && futureRecord.data[i]['surface'] == "Carpet" || futureRecord.data[i]['surface'] == "Hard")
          {
            const newData = 
            {
              winner_elo_surface: winner_elo_surface + futureRecord.data[i]['winner_elo_surface']
            };

            await axios.put(
              MATCHES_URL + futureRecord.data[i]['_id'],
              newData,
              config
            );
          }
          else if (payload[1]['surface'] == futureRecord.data[i]['surface'])
          {
            const newData = 
            {
              winner_elo_surface: winner_elo_surface + futureRecord.data[i]['winner_elo_surface']
            };

            await axios.put(
              MATCHES_URL + futureRecord.data[i]['_id'],
              newData,
              config
            );
          }
        }
        else if (payload[1]['winner_local_id'] == futureRecord.data[i]['loser_local_id'])
        {
          const newData = 
          {
            loser_elo: winner_elo + futureRecord.data[i]['loser_elo']
          };

          await axios.put(
            MATCHES_URL + futureRecord.data[i]['_id'],
            newData,
            config
          );

          if (payload[2]['surface'] == "Carpet" || payload[2]['surface'] == "Hard" 
            && futureRecord.data[i]['surface'] == "Carpet" || futureRecord.data[i]['surface'] == "Hard")
          {
            const newData = 
            {
              loser_elo_surface: winner_elo_surface + futureRecord.data[i]['loser_elo_surface']
            };

            await axios.put(
              MATCHES_URL + futureRecord.data[i]['_id'],
              newData,
              config
            );
          }
          else if (payload[1]['surface'] == futureRecord.data[i]['surface'])
          {
            const newData = 
            {
              loser_elo_surface: winner_elo_surface + futureRecord.data[i]['loser_elo_surface']
            };

            await axios.put(
              MATCHES_URL + futureRecord.data[i]['_id'],
              newData,
              config
            );
          }
        }
      }
    }
  }
  return updatedMatch.data;
};

const deleteMatch = async (match_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const deletedMatch = await axios.delete(MATCHES_URL + match_id, config);
  return deletedMatch.data;
};

const updateTournament = async (payload, token) => {
  console.log(payload);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const updatedTournament = await axios.put(
    TOURNEY_URL + payload[0],
    payload[1],
    config
  );
  return updatedTournament.data;
};

const deleteTournament = async (match_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const deletedTournament = await axios.delete(TOURNEY_URL + match_id, config);
  return deletedTournament.data;
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
  updateMatch,
  deleteMatch,
  updateTournament,
  deleteTournament,
};

export default playersService;
