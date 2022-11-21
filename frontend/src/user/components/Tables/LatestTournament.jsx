import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactCountryFlag from "react-country-flag";
import { ShowHighlight } from "./Highlight";
import { CaretUpFill, CaretDownFill, CameraVideo } from "react-bootstrap-icons";

function toTitleCase(str) {
  if (str.toLowerCase() === "mcenroe john") {
    return "McEnroe John";
  }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function parseDate(dateString) {
  if (!dateString.includes("-") && !dateString.includes("/")) {
    return dateString.substring(0, 4) + "-" + dateString.substring(4, 6);
  } else {
    if (dateString.includes("-")) {
      var newdate = dateString.split(" ")[0].split("-");
      return newdate[0] + "-" + newdate[1];
    } else {
      var newdate = dateString.split(" ")[0].split("/");
      if (newdate[0].length != 2) {
        newdate[0] = "0" + newdate[0];
      }
      return newdate[2] + "-" + newdate[0];
    }
  }
}

export default function LatestTournament() {
  const navigate = useNavigate();
  const [tourney_data, setTourney_data] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    //fetch tourney_data from api and set it to tourney_data
    fetch(`/api/latesttournament`)
      .then((res) => res.json())
      .then((json) => {
        setTourney_data(json);
        setIsLoading(false);
      });
  }, []);

  console.log(tourney_data);
  if (tourney_data.length === 0) {
    return <div></div>;
  }

  var currentRound = "";
  return (
    <>
      {tourney_data.map((tourney) => (
        <div className="card mb-2 shadow-sm rounded-3">
          <div
            className="card-header rounded-t-3 pt-3"
            style={{ backgroundColor: "white" }}
          >
            <div hidden={true}>{(currentRound = "")}</div>
            <div class="d-flex justify-content-between">
              <h4>
                <b>
                  <a href={`./tournaments/` + tourney[0]._id}>
                    {tourney[0].tournament}
                  </a>
                </b>
              </h4>
              <h5>
                <b>{parseDate(tourney[0].games[0].tourney_date.toString())}</b>
              </h5>
            </div>
          </div>
          <div className="card-body">
            <div>
              <div className="table-responsive-xl">
                <table
                  style={{ boxShadow: "none" }}
                  className="table borderless liverating-table-bg-white text-center mb-0"
                >
                  <thead>
                    <tr>
                      <th style={{ maxWidth: 70 }} scope="col">
                        <b>Round</b>
                      </th>
                      <th style={{ maxWidth: 10 }} scope="col"></th>
                      <th
                        style={{ minWidth: 90 }}
                        className="text-start"
                        scope="col"
                      >
                        <b>Winner Name</b>
                      </th>

                      <th
                        style={{ minWidth: 90 }}
                        className="text-start"
                        scope="col"
                      >
                        <b>Loser Name</b>
                      </th>

                      <th
                        style={{ minWidth: 200 }}
                        className="text-start"
                        scope="col"
                      >
                        <b>Score</b>
                      </th>
                      <th scope="col">
                        <b>H2H</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="match-stats">
                    {tourney[0].games.map((match) => (
                      <>
                        {currentRound.toLowerCase() ==
                        match.round.toLowerCase() ? (
                          <></>
                        ) : (
                          <>
                            {currentRound != "" ? (
                              <>
                                <div hidden={true}>
                                  {(currentRound = match.round)}
                                </div>
                                <tr>
                                  <td colSpan={100}>
                                    <hr />
                                  </td>
                                </tr>
                              </>
                            ) : (
                              <div hidden={true}>
                                {(currentRound = match.round)}
                              </div>
                            )}
                          </>
                        )}
                        <tr
                          style={{
                            lineHeight: 1.5,
                            minHeight: 1.5,
                            height: 1.5,
                          }}
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
                                  {
                                    <ReactCountryFlag
                                      countryCode={match.winner_local_id.substring(
                                        0,
                                        2
                                      )}
                                      style={{
                                        filter:
                                          "drop-shadow(0 0 0.05rem black)",
                                      }}
                                      svg
                                    />
                                  }
                                  {"\xa0\xa0\xa0\xa0"}
                                  {toTitleCase(match.winner_name)}
                                </a>
                              </>
                            ) : (
                              <> {toTitleCase(match.winner_name)}</>
                            )}
                          </td>
                          <td className="text-start " id="name">
                            {match.loser_local_id != null ? (
                              <>
                                <a href={`./` + match.loser_local_id}>
                                  {
                                    <ReactCountryFlag
                                      countryCode={match.loser_local_id.substring(
                                        0,
                                        2
                                      )}
                                      style={{
                                        filter:
                                          "drop-shadow(0 0 0.05rem black)",
                                      }}
                                      svg
                                    />
                                  }
                                  {"\xa0\xa0\xa0\xa0"}
                                  {toTitleCase(match.loser_name)}
                                </a>
                              </>
                            ) : (
                              <> {toTitleCase(match.loser_name)}</>
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
          </div>
        </div>
      ))}
    </>
  );
}
