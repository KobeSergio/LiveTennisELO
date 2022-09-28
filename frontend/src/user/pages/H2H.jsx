import { H2HTable } from "../components/Tables/H2HTable";
import PlayerInfo from "../components/Tables/PlayerInfo";
import ClipLoader from "react-spinners/ClipLoader";

//Backend
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getH2H,
  loadPlayer,
  loadPlayerList,
  resetPlayer,
} from "../../features/api/apiSlice";

function getPerformance(data, player_id) {
  var uncounted = 0;
  var wins = { overall: 0, hard: 0, clay: 0, grass: 0 };
  data.forEach((match) => {
    if (match.score != "W/O") {
      //Add win or lose
      if (match.winner_local_id == player_id) {
        wins.overall++;
        switch (match.surface.toLowerCase()) {
          case "hard":
            wins.hard++;
            break;
          case "carpet":
            wins.hard++;
            break;
          case "clay":
            wins.clay++;
            break;
          case "grass":
            wins.grass++;
            break;
          default:
            break;
        }
      }
    } else {
      uncounted++;
    }
  });

  return wins;
}
export default function H2H() {
  const { api_isLoading, H2H, players } = useSelector((state) => state.api);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (players.length === 0) {
      dispatch(loadPlayerList());
    }
    if (H2H == null) {
      dispatch(getH2H(searchParams.get("player_ids")));
    }
  }, []);

  useEffect(() => {
    if (players.length === 0) {
      dispatch(loadPlayerList());
    }
    dispatch(getH2H(searchParams.get("player_ids")));
  }, [navigate]);

  const override = {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  if (H2H == null || api_isLoading) {
    return <ClipLoader cssOverride={override} size={70} />;
  }
  return (
    <>
      <div className="p-3">
        <div className="d-flex justify-content-center">
          <h2>
            <b>
              {" "}
              H2H:{" "}
              {`${H2H.players[0].player_name} vs ${
                H2H.players[1].player_name
              } (${
                getPerformance(H2H.h2h, H2H.players[0].player_id).overall
              } : ${
                getPerformance(H2H.h2h, H2H.players[1].player_id).overall
              })`}
            </b>
          </h2>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-xs-12 col-lg-6">
            <PlayerInfo player={H2H.players[0]} h2h={H2H.h2h} />
          </div>
          <div className="col-xs-12 col-lg-6">
            <PlayerInfo player={H2H.players[1]} h2h={H2H.h2h} />
          </div>
        </div>
        <H2HTable player_matches={H2H.h2h} />
      </div>
    </>
  );
}
