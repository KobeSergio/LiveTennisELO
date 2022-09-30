import { SurfaceLegend } from "../Legend/SurfaceLegend";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CaretUpFill, CaretDownFill, CameraVideo } from "react-bootstrap-icons";
import { useEffect } from "react";
import { AddHighlight, ShowHighlight } from "./Highlight";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

function toTitleCase(str) {
  if (str.toLowerCase() === "mcenroe john") {
    return "McEnroe John";
  }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function parseDate(date) {
  var dateString = date.toString();
  return dateString.substring(0, 4) + "-" + dateString.substring(4, 6);
}

function checkOpp(player_id, match) {
  var result = "L";
  var opponent = "";
  var opponent_id = "";
  var opp_rating = 2350;
  var opp_surface_rating = 2350;
  var opp_rating_gains = 0;
  var opp_surface_rating_gains = 0;

  if (match.loser_local_id === player_id) {
    if (match.loser_elo != null) {
      opp_rating = match.loser_elo;
      opp_surface_rating = match.loser_elo_surface;
    }
    result = "W";
    opponent = match.loser_name;
    opponent_id = match.loser_local_id;
    opp_rating_gains = match.loser_elo_gains;
    opp_surface_rating_gains = match.loser_elo_surface_gains;
  } else if (match.winner_local_id === player_id) {
    if (match.winner_elo != null) {
      opp_rating = match.winner_elo;
      opp_surface_rating = match.winner_elo_surface;
    }
    result = "L";
    opponent = match.winner_name;
    opponent_id = match.winner_local_id;
    opp_rating = match.winner_elo;
    opp_rating_gains = match.winner_elo_gains;
    opp_surface_rating_gains = match.winner_elo_surface_gains;
  } else {
    //Player not found
  }
  return {
    result: result,
    opponent: opponent,
    opponent_id: opponent_id,
    opp_rating: opp_rating,
    opp_rating_gains: opp_rating_gains,
    opp_surface_rating: opp_surface_rating,
    opp_surface_rating_gains: opp_surface_rating_gains,
  };
}

export function H2HTable({ player_matches }) {
  const navigate = useNavigate();
  const [data, setData] = useState(player_matches);
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [DataPerPage, setDataPerPage] = useState(10);
  //Get index of the last Data
  const indexOfLastData = currentPage * DataPerPage;
  const indexOfFirstData = indexOfLastData - DataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);
  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    //Sort table by latest matches and in the proper order.
    setData(
      [...data].sort(
        (a, b) => b.tourney_date - a.tourney_date || b.match_num - a.match_num
      )
    );
  }, []);

  var currentMatch = "";
  var currentDate = "";

  const [currentSurface, setCurrentSurface] = useState("All Surface");
  if (player_matches.length === 0) {
    return;
  }

  return (
    <>
      <div className="bg-white container-fluid shadow-lg rounded my-3">
        <div className="row h-100 py-3 rounded">
          <h5 className="mt-3 ms-1">
            <b>Match History:</b>
          </h5>
          <div className="ms-auto d-flex">
            <Dropdown className="border border-dark dropdown mx-2 rounded-3">
              <Dropdown.Toggle variant="white" id="dropdown-basic" size="lg">
                {currentSurface}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setCurrentSurface("All Surface");
                    setData(
                      [...player_matches].sort(
                        (a, b) =>
                          b.tourney_date - a.tourney_date ||
                          b.match_num - a.match_num
                      )
                    );
                  }}
                  href="#/"
                >
                  All Surface
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCurrentSurface("Hard");
                    setData(
                      [...player_matches]
                        .filter((element) => element.surface == "Hard")
                        .sort(
                          (a, b) =>
                            b.tourney_date - a.tourney_date ||
                            b.match_num - a.match_num
                        )
                    );
                  }}
                  href="#/"
                >
                  Hard
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCurrentSurface("Clay");
                    setData(
                      [...player_matches]
                        .filter((element) => element.surface == "Clay")
                        .sort(
                          (a, b) =>
                            b.tourney_date - a.tourney_date ||
                            b.match_num - a.match_num
                        )
                    );
                  }}
                  href="#/"
                >
                  Clay
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setCurrentSurface("Grass");
                    setData(
                      [...player_matches]
                        .filter((element) => element.surface == "Grass")
                        .sort(
                          (a, b) =>
                            b.tourney_date - a.tourney_date ||
                            b.match_num - a.match_num
                        )
                    );
                  }}
                  href="#/"
                >
                  Grass
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="ms-auto d-flex align-items-start">
              <SurfaceLegend />
            </div>
          </div>
          <div className="table-responsive">
            <table
              style={{ boxShadow: "none" }}
              className="table table-borderless text-center mb-0"
            >
              <thead>
                <tr>
                  <th
                    style={{ minWidth: 85 }}
                    className="table-date"
                    scope="col"
                  >
                    <b>Date</b>
                  </th>
                  <th style={{ minWidth: 40 }} scope="col">
                    <b>{"\xa0"}</b>
                  </th>
                  <th
                    style={{ minWidth: 130 }}
                    className="text-start"
                    scope="col"
                  >
                    <b>Winner</b>
                  </th>
                  <th style={{ minWidth: 110 }} scope="col">
                    <b>Winner Overall Rating</b>
                  </th>
                  <th style={{ minWidth: 110 }} scope="col">
                    <b>Winner Surface ELO</b>
                  </th>
                  <th
                    style={{ minWidth: 160 }}
                    className="text-start"
                    scope="col"
                  >
                    <b>Score</b>
                  </th>
                  <th
                    style={{ minWidth: 130 }}
                    className="text-start"
                    scope="col"
                  >
                    <b>Loser</b>
                  </th>
                  <th style={{ minWidth: 110 }} scope="col">
                    <b>Loser Overall Rating</b>
                  </th>
                  <th style={{ minWidth: 110 }} scope="col">
                    <b>Loser Surface ELO</b>
                  </th>
                  <th style={{ minWidth: 120 }} scope="col">
                    <b>Tournament</b>
                  </th>
                  <th scope="col">
                    <b>Round</b>
                  </th>
                </tr>
              </thead>
              <tbody className="match-stats">
                {currentData.map((match) => (
                  <>
                    {currentMatch.toLowerCase() ==
                      match.tourney_name.toLowerCase() &&
                    currentDate == match.tourney_date ? (
                      <></>
                    ) : (
                      <>
                        <div hidden={true}>
                          {(currentMatch = match.tourney_name)}
                          {(currentDate = match.tourney_date)}
                        </div>
                        <tr>
                          <td colSpan={100}>
                            <hr />
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td scope="row" id="date">
                        {parseDate(match.tourney_date)}
                      </td>
                      <td className="table-result" id="result">
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
                      <td className="text-start table-name" id="name">
                        <a
                          href="#/"
                          onClick={() =>
                            navigate("/players/" + match.winner_local_id)
                          }
                        >
                          {toTitleCase(match.winner_name)}
                        </a>
                      </td>
                      <td className="table-ratings" id="opp-rating">
                        {checkOpp(match.winner_local_id, match).opp_rating !=
                          2350 &&
                        checkOpp(match.winner_local_id, match).opp_rating !=
                          null &&
                        checkOpp(match.winner_local_id, match).opp_rating > 1
                          ? checkOpp(match.winner_local_id, match).opp_rating -
                            checkOpp(match.winner_local_id, match)
                              .opp_rating_gains
                          : "< 2350"}
                        {checkOpp(match.winner_local_id, match)
                          .opp_rating_gains > 0 ? (
                          <span className="ms-2 positive-elo">
                            <CaretUpFill size={10} color="green" />
                            <br />
                            {
                              checkOpp(match.winner_local_id, match)
                                .opp_rating_gains
                            }
                          </span>
                        ) : checkOpp(match.winner_local_id, match)
                            .opp_rating_gains < 0 ? (
                          <span className="ms-2 negative-elo">
                            <CaretDownFill size={10} color="red" />
                            <br />
                            {
                              checkOpp(match.winner_local_id, match)
                                .opp_rating_gains
                            }
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
                      <td className="table-surface-elo" id="opp-surface-elo">
                        {checkOpp(match.winner_local_id, match)
                          .opp_surface_rating != 2350 &&
                        checkOpp(match.winner_local_id, match).opp_rating !=
                          null &&
                        checkOpp(match.winner_local_id, match).opp_rating >
                          1 ? (
                          <>
                            {match.surface == "Grass" ? (
                              <span
                                style={{ backgroundColor: "#3EBA7C" }}
                                className="table-surface-elo-label"
                              >
                                {checkOpp(match.winner_local_id, match)
                                  .opp_surface_rating -
                                  checkOpp(match.winner_local_id, match)
                                    .opp_surface_rating_gains}
                              </span>
                            ) : match.surface == "Hard" ||
                              match.surface == "Carpet" ? (
                              <span
                                style={{ backgroundColor: "#3B9FB9" }}
                                className="table-surface-elo-label"
                              >
                                {checkOpp(match.winner_local_id, match)
                                  .opp_surface_rating -
                                  checkOpp(match.winner_local_id, match)
                                    .opp_surface_rating_gains}
                              </span>
                            ) : match.surface == "Clay" ? (
                              <span
                                style={{ backgroundColor: "#E96513" }}
                                className="table-surface-elo-label"
                              >
                                {checkOpp(match.winner_local_id, match)
                                  .opp_surface_rating -
                                  checkOpp(match.winner_local_id, match)
                                    .opp_surface_rating_gains}
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

                        {checkOpp(match.winner_local_id, match)
                          .opp_rating_gains > 0 ? (
                          <span className="ms-2 positive-elo">
                            <CaretUpFill size={10} color="green" />
                            <br />
                            {
                              checkOpp(match.winner_local_id, match)
                                .opp_surface_rating_gains
                            }
                          </span>
                        ) : checkOpp(match.winner_local_id, match)
                            .opp_surface_rating_gains < 0 ? (
                          <span className="ms-2 negative-elo">
                            <CaretDownFill size={10} color="red" />
                            <br />
                            {
                              checkOpp(match.winner_local_id, match)
                                .opp_surface_rating_gains
                            }
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
                      <td className="text-start table-score" id="score">
                        {match.score}
                      </td>
                      <td className="text-start table-name" id="name">
                        <a
                          href="#/"
                          onClick={() =>
                            navigate("/players/" + match.loser_local_id)
                          }
                        >
                          {toTitleCase(match.loser_name)}
                        </a>
                      </td>
                      <td className="table-ratings" id="opp-rating">
                        {checkOpp(match.loser_local_id, match).opp_rating !=
                          2350 &&
                        checkOpp(match.loser_local_id, match).opp_rating !=
                          null &&
                        checkOpp(match.loser_local_id, match).opp_rating > 1
                          ? checkOpp(match.loser_local_id, match).opp_rating -
                            checkOpp(match.loser_local_id, match)
                              .opp_rating_gains
                          : "< 2350"}
                        {checkOpp(match.loser_local_id, match)
                          .opp_rating_gains > 0 ? (
                          <span className="ms-2 positive-elo">
                            <CaretUpFill size={10} color="green" />
                            <br />
                            {
                              checkOpp(match.loser_local_id, match)
                                .opp_rating_gains
                            }
                          </span>
                        ) : checkOpp(match.loser_local_id, match)
                            .opp_rating_gains < 0 ? (
                          <span className="ms-2 negative-elo">
                            <CaretDownFill size={10} color="red" />
                            <br />
                            {
                              checkOpp(match.loser_local_id, match)
                                .opp_rating_gains
                            }
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
                      <td className="table-surface-elo" id="opp-surface-elo">
                        {checkOpp(match.loser_local_id, match)
                          .opp_surface_rating != 2350 &&
                        checkOpp(match.loser_local_id, match).opp_rating !=
                          null &&
                        checkOpp(match.loser_local_id, match).opp_rating > 1 ? (
                          <>
                            {match.surface == "Grass" ? (
                              <span
                                style={{ backgroundColor: "#3EBA7C" }}
                                className="table-surface-elo-label"
                              >
                                {checkOpp(match.loser_local_id, match)
                                  .opp_surface_rating -
                                  checkOpp(match.loser_local_id, match)
                                    .opp_surface_rating_gains}
                              </span>
                            ) : match.surface == "Hard" ||
                              match.surface == "Carpet" ? (
                              <span
                                style={{ backgroundColor: "#3B9FB9" }}
                                className="table-surface-elo-label"
                              >
                                {checkOpp(match.loser_local_id, match)
                                  .opp_surface_rating -
                                  checkOpp(match.loser_local_id, match)
                                    .opp_surface_rating_gains}
                              </span>
                            ) : match.surface == "Clay" ? (
                              <span
                                style={{ backgroundColor: "#E96513" }}
                                className="table-surface-elo-label"
                              >
                                {checkOpp(match.loser_local_id, match)
                                  .opp_surface_rating -
                                  checkOpp(match.loser_local_id, match)
                                    .opp_surface_rating_gains}
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

                        {checkOpp(match.loser_local_id, match)
                          .opp_rating_gains > 0 ? (
                          <span className="ms-2 positive-elo">
                            <CaretUpFill size={10} color="green" />
                            <br />
                            {
                              checkOpp(match.loser_local_id, match)
                                .opp_surface_rating_gains
                            }
                          </span>
                        ) : checkOpp(match.loser_local_id, match)
                            .opp_surface_rating_gains < 0 ? (
                          <span className="ms-2 negative-elo">
                            <CaretDownFill size={10} color="red" />
                            <br />
                            {
                              checkOpp(match.loser_local_id, match)
                                .opp_surface_rating_gains
                            }
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
                      <td className="table-tournament" id="tournament">
                        {match.tourney_name}
                      </td>
                      <td className="table-round" id="round">
                        {match.round}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex flex-row-reverse">
          <nav className="pagination-outer">
            <ul className="pagination">
              <Pagination
                DataPerPage={DataPerPage}
                totalData={data.length}
                paginate={paginate}
              />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
