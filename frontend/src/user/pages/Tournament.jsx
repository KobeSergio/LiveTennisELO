import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadTournament } from "../../features/api/apiSlice";
import { ShowHighlight } from "../components/Tables/Highlight";
import { CaretUpFill, CaretDownFill, CameraVideo } from "react-bootstrap-icons";
import ClipLoader from "react-spinners/ClipLoader";

function toTitleCase(str) {
  if (str.toLowerCase() === "mcenroe john") {
    return "McEnroe John";
  }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function parseDate(dateString) {
  if (dateString == null) {
    return null;
  }

  return `${dateString.toString().slice(0, 4)}-${dateString
    .toString()
    .slice(4, 6)}-${dateString.toString().slice(6, 8)}`;
}

export default function Tournament() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tourney_id } = useParams();
  const { tournament_matches, api_isLoading } = useSelector(
    (state) => state.api
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(loadTournament(tourney_id));
  }, []);

  useEffect(() => {
    console.log(tournament_matches);
    if (tournament_matches.length != 0) {
      //sort tournament matches by match_num
      setData(
        [...tournament_matches.tournament].sort((a, b) =>
          a.match_num < b.match_num ? 1 : -1
        )
      );
    }
  }, [tournament_matches]);

  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  console.log(data);
  if (api_isLoading || data == null || data.length == 0) {
    return <ClipLoader cssOverride={override} size={70} />;
  }

  //return table with tournament matches
  return (
    <div className="px-4 py-4">
      <div className="row text-center">
        <div className="ms-2">
          <h1 className="fw-bold fs-2">
            {tournament_matches?.tournament[0].tourney_name}
          </h1>
          <p>{parseDate(tournament_matches?.tournament[0].tourney_date)}</p>
        </div>
      </div>
      <div className="table-responsive-xl">
        <table
          style={{ boxShadow: "none" }}
          className="table liverating-table-bg-white rounded-3 text-center"
        >
          <thead>
            <tr>
              <th style={{ maxWidth: 70 }} scope="col">
                <b>Round</b>
              </th>
              <th style={{ maxWidth: 10 }} scope="col"></th>
              <th style={{ minWidth: 90 }} className="text-start" scope="col">
                <b>Winner Name</b>
              </th>
              <th style={{ minWidth: 85 }} scope="col">
                <b>Winner ELO</b>
              </th>
              <th style={{ minWidth: 85 }} scope="col">
                <b>Surf. ELO</b>
              </th>
              <th style={{ minWidth: 90 }} className="text-start" scope="col">
                <b>Loser Name</b>
              </th>
              <th style={{ minWidth: 85 }} scope="col">
                <b>Loser ELO</b>
              </th>
              <th style={{ minWidth: 85 }} scope="col">
                <b>Surf. ELO</b>
              </th>
              <th style={{ minWidth: 200 }} className="text-start" scope="col">
                <b>Score</b>
              </th>
              <th scope="col">
                <b>H2H</b>
              </th>
            </tr>
          </thead>
          <tbody className="match-stats">
            {/* map data */}
            {data.map((match) => (
              <>
                <tr
                  style={{ lineHeight: 2.5, minHeight: 2.5, height: 2.5 }}
                  className="align-middle"
                >
                  <td scope="row" id="date" key={match.tourney_id}>
                    <b>{match.round}</b>
                  </td>
                  <td id="result">
                    <div className="d-flex justify-content-center">
                      <span className="me-2 highlights-button">
                        {match.highlight == null ? (
                          <>
                            <CameraVideo color="white" />
                          </>
                        ) : (
                          <>
                            {match.highlight != "" ? (
                              <ShowHighlight
                                props={match._id}
                                src={match.highlight}
                              />
                            ) : (
                              <>
                                <CameraVideo color="white" />
                              </>
                            )}
                          </>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="text-start  " id="name">
                    {match.winner_local_id != null ? (
                      <>
                        <a href={`./` + match.winner_local_id}>
                          {toTitleCase(match.winner_name)}
                        </a>
                      </>
                    ) : (
                      <> {toTitleCase(match.winner_name)}</>
                    )}
                  </td>
                  <td id="opp-rating">
                    {match.winner_elo != 2350 &&
                    match.winner_elo != null &&
                    match.winner_elo > 1
                      ? match.winner_elo
                      : "< 2350"}
                    {match.winner_elo_gains > 0 ? (
                      <span className="ms-2 positive-elo">
                        <CaretUpFill size={10} color="green" />
                        <br />
                        {match.winner_elo_gains}
                      </span>
                    ) : match.winner_elo_gains < 0 ? (
                      <span className="ms-2 negative-elo">
                        <CaretDownFill size={10} color="red" />
                        <br />
                        {match.winner_elo_gains}
                      </span>
                    ) : (
                      <>
                        <span className="ms-2 negative-elo">
                          <CaretDownFill size={10} color="white" />
                          <br />
                          {"\xa0"}
                        </span>
                      </>
                    )}
                  </td>
                  <td id="opp-rating">
                    {match.winner_elo_surface != 2350 &&
                    match.winner_elo_surface != null &&
                    match.winner_elo_surface > 1 ? (
                      <>
                        {match.surface == "Grass" ? (
                          <span
                            style={{ backgroundColor: "#3EBA7C" }}
                            className="table-surface-elo-label"
                          >
                            {match.winner_elo_surface}
                          </span>
                        ) : match.surface == "Hard" ||
                          match.surface == "Carpet" ? (
                          <span
                            style={{ backgroundColor: "#3B9FB9" }}
                            className="table-surface-elo-label"
                          >
                            {match.winner_elo_surface}
                          </span>
                        ) : match.surface == "Clay" ? (
                          <span
                            style={{ backgroundColor: "#E96513" }}
                            className="table-surface-elo-label"
                          >
                            {match.winner_elo_surface}
                          </span>
                        ) : (
                          <> </>
                        )}
                      </>
                    ) : (
                      <>
                        {match.surface == "Grass" ? (
                          <span
                            style={{ backgroundColor: "#3EBA7C" }}
                            className="table-surface-elo-label"
                          >
                            {"< 2350"}
                          </span>
                        ) : match.surface == "Hard" ||
                          match.surface == "Carpet" ? (
                          <span
                            style={{ backgroundColor: "#3B9FB9" }}
                            className="table-surface-elo-label"
                          >
                            {"< 2350"}
                          </span>
                        ) : match.surface == "Clay" ? (
                          <span
                            style={{ backgroundColor: "#E96513" }}
                            className="table-surface-elo-label"
                          >
                            {"< 2350"}
                          </span>
                        ) : (
                          <> </>
                        )}
                      </>
                    )}
                    {match.winner_elo_surface_gains > 0 ? (
                      <span className="ms-2 positive-elo">
                        <CaretUpFill size={10} color="green" />
                        <br />
                        {match.winner_elo_surface_gains}
                      </span>
                    ) : match.winner_elo_surface_gains < 0 ? (
                      <span className="ms-2 negative-elo">
                        <CaretDownFill size={10} color="red" />
                        <br />
                        {match.winner_elo_surface_gains}
                      </span>
                    ) : (
                      <>
                        <span className="ms-2 negative-elo">
                          <CaretDownFill size={10} color="white" />
                          <br />
                          {"\xa0"}
                        </span>
                      </>
                    )}
                  </td>
                  <td className="text-start " id="name">
                    {match.loser_local_id != null ? (
                      <>
                        <a href={`./` + match.loser_local_id}>
                          {toTitleCase(match.loser_name)}
                        </a>
                      </>
                    ) : (
                      <> {toTitleCase(match.loser_name)}</>
                    )}
                  </td>
                  <td id="opp-rating">
                    {match.loser_elo != 2350 &&
                    match.loser_elo != null &&
                    match.loser_elo > 1
                      ? match.loser_elo
                      : "< 2350"}
                    {match.loser_elo_gains > 0 ? (
                      <span className="ms-2 positive-elo">
                        <CaretUpFill size={10} color="green" />
                        <br />
                        {match.loser_elo_gains}
                      </span>
                    ) : match.loser_elo_gains < 0 ? (
                      <span className="ms-2 negative-elo">
                        <CaretDownFill size={10} color="red" />
                        <br />
                        {match.loser_elo_gains}
                      </span>
                    ) : (
                      <>
                        <span className="ms-2 negative-elo">
                          <CaretDownFill size={10} color="white" />
                          <br />
                          {"\xa0"}
                        </span>
                      </>
                    )}
                  </td>
                  <td id="opp-rating">
                    {match.loser_elo_surface != 2350 &&
                    match.loser_elo_surface != null &&
                    match.loser_elo_surface > 1 ? (
                      <>
                        {match.surface == "Grass" ? (
                          <span
                            style={{ backgroundColor: "#3EBA7C" }}
                            className="table-surface-elo-label"
                          >
                            {match.loser_elo_surface}
                          </span>
                        ) : match.surface == "Hard" ||
                          match.surface == "Carpet" ? (
                          <span
                            style={{ backgroundColor: "#3B9FB9" }}
                            className="table-surface-elo-label"
                          >
                            {match.loser_elo_surface}
                          </span>
                        ) : match.surface == "Clay" ? (
                          <span
                            style={{ backgroundColor: "#E96513" }}
                            className="table-surface-elo-label"
                          >
                            {match.loser_elo_surface}
                          </span>
                        ) : (
                          <> </>
                        )}
                      </>
                    ) : (
                      <>
                        {match.surface == "Grass" ? (
                          <span
                            style={{ backgroundColor: "#3EBA7C" }}
                            className="table-surface-elo-label"
                          >
                            {"< 2350"}
                          </span>
                        ) : match.surface == "Hard" ||
                          match.surface == "Carpet" ? (
                          <span
                            style={{ backgroundColor: "#3B9FB9" }}
                            className="table-surface-elo-label"
                          >
                            {"< 2350"}
                          </span>
                        ) : match.surface == "Clay" ? (
                          <span
                            style={{ backgroundColor: "#E96513" }}
                            className="table-surface-elo-label"
                          >
                            {"< 2350"}
                          </span>
                        ) : (
                          <> </>
                        )}
                      </>
                    )}
                    {match.loser_elo_surface_gains > 0 ? (
                      <span className="ms-2 positive-elo">
                        <CaretUpFill size={10} color="green" />
                        <br />
                        {match.loser_elo_surface_gains}
                      </span>
                    ) : match.loser_elo_surface_gains < 0 ? (
                      <span className="ms-2 negative-elo">
                        <CaretDownFill size={10} color="red" />
                        <br />
                        {match.loser_elo_surface_gains}
                      </span>
                    ) : (
                      <>
                        <span className="ms-2 negative-elo">
                          <CaretDownFill size={10} color="white" />
                          <br />
                          {"\xa0"}
                        </span>
                      </>
                    )}
                  </td>
                  <td className="text-start" id="score">
                    {"\xa0"}
                    {match.score}
                  </td>
                  <td id="round">
                    {match.loser_local_id == null ||
                    match.winner_local_id == null ? (
                      <></>
                    ) : (
                      <>
                        <a
                          href="#/"
                          onClick={() => {
                            navigate(
                              `/players/H2H?player_ids=${match.loser_local_id},${match.winner_local_id}`
                            );
                          }}
                        >
                          H2H
                        </a>
                      </>
                    )}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
