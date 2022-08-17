import { MatchFilter } from "../Dropdown";
import { SurfaceLegend } from "../Legend";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons";
import { useEffect } from "react";
import { AddHighlight } from "./AddHighlight";

function parseDate(date) {
  var dateString = date.toString();
  return dateString.substring(0, 4) + "-" + dateString.substring(4, 6);
}

function checkOpp(player_id, match) {
  var result = "L";
  var opponent = "";
  var opponent_id = "";
  var opp_rating = 2400;
  var opp_surface_rating = 2400;
  var opp_rating_gains = 0;
  var opp_surface_rating_gains = 0;

  if (match.winner_local_id == player_id) {
    if (match.loser_elo != null) {
      opp_rating = match.loser_elo;
      opp_surface_rating = match.loser_elo_surface;
    }
    result = "W";
    opponent = match.loser_name;
    opponent_id = match.loser_local_id;
    opp_rating_gains = match.loser_elo_gains;
    opp_surface_rating_gains = match.loser_elo_surface_gains;
  } else if (match.loser_local_id == player_id) {
    if (match.winner_elo != null) {
      opp_rating = match.loser_elo;
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

function getStats(data, player_id) {
  var opp_ratings = [];
  var opp_surface_ratings = [];

  data.forEach((element) => {
    if (element.winner_local_id == player_id) {
      if (element.loser_elo == null) {
        opp_ratings.push(2400);
      } else {
        opp_ratings.push(element.loser_elo - element.loser_elo_gains);
      }
      // opp_surface_ratings.push(
      //   element.loser_elo_surface - element.loser_elo_surface_gains
      // );
    } else if (element.loser_local_id == player_id) {
      if (element.winner_elo == null) {
        opp_ratings.push(2400);
      } else {
        opp_ratings.push(element.winner_elo - element.winner_elo_gains);
      }
      // opp_surface_ratings.push(
      //   element.winner_elo_surface - element.winner_elo_surface_gains
      // );
    }
  });

  console.log(opp_ratings);
  return {
    ave_ELO: opp_ratings.reduce((a, b) => a + b, 0) / opp_ratings.length,
    perf_ELO: null,
  };
}

export function PlayerMatches(props) {
  const [data, setData] = useState(props.player_matches);
  const { player_id } = useParams();

  useEffect(() => {
    //Sort table by latest matches and in the proper order.
    setData(
      [...data]
        .sort(
          (a, b) => b.tourney_date - a.tourney_date || b.match_num - a.match_num
        )
        .splice(0, 10)
    );
  }, []);

  console.log(data);
  return (
    <>
      <div className="bg-white container-fluid h-100 shadow rounded pt-1 mb-5 mt-5">
        <div className="row h-100 py-3 rounded">
          <div>
            <h1 className="fs-5 fw-bold pb-2">
              Last 10 matches of {props.player.player_name}
            </h1>
          </div>
          <main className="col ms-3">
            <div className="ms-auto d-flex">
              <MatchFilter />
              <div className="ms-auto d-flex align-items-start py-2">
                <SurfaceLegend />
              </div>
            </div>
            <div className="col">
              <div
                className="bg-white"
                style={{ borderRadius: "10px 10px 0 0" }}
              >
                <div className="input-group">
                  <table className="table table-borderless text-center">
                    <thead>
                      <tr>
                        <th className="table-date" scope="col">
                          <b>Date</b>
                        </th>
                        <th style={{ minWidth: 85 }} scope="col">
                          <b>Result</b>
                        </th>
                        <th scope="col">
                          <b>Opponent</b>
                        </th>
                        <th scope="col">
                          <b>Opp. Rating</b>
                        </th>
                        <th style={{ minWidth: 100 }} scope="col">
                          <b>Opp. Surface ELO</b>
                        </th>
                        <th className="text-start" scope="col">
                          <b>Score</b>
                        </th>
                        <th scope="col">
                          <b>Tournament</b>
                        </th>
                        <th scope="col">
                          <b>Round</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((match) => (
                        <tr>
                          <th scope="row" id="date">
                            {parseDate(match.tourney_date)}
                          </th>
                          <td className="table-result" id="result">
                            <span className="me-2 highlights-button">
                              <AddHighlight />
                            </span>
                            {checkOpp(player_id, match).result === "W" ? (
                              //GREEN SPAN
                              <span
                                style={{ backgroundColor: "#9DDEBD" }}
                                className="table-result-label"
                              >
                                {checkOpp(player_id, match).result}
                              </span>
                            ) : (
                              //RED SPAN
                              <span
                                style={{ backgroundColor: "#F38689" }}
                                className="table-result-label"
                              >
                                {checkOpp(player_id, match).result}
                              </span>
                            )}
                          </td>
                          <td className="text-start table-name" id="name">
                            {checkOpp(player_id, match).opponent_id != null ? (
                              <>
                                <a
                                  href={
                                    `./` +
                                    checkOpp(player_id, match).opponent_id
                                  }
                                >
                                  {checkOpp(player_id, match).opponent}
                                </a>
                              </>
                            ) : (
                              <>{checkOpp(player_id, match).opponent}</>
                            )}
                          </td>
                          <td className="table-ratings" id="opp-rating">
                            {checkOpp(player_id, match).opp_rating != 2400
                              ? checkOpp(player_id, match).opp_rating -
                                checkOpp(player_id, match).opp_rating_gains
                              : "< 2400"}
                            {checkOpp(player_id, match).opp_rating_gains > 0 ? (
                              <span className="ms-2 positive-elo">
                                <CaretUpFill size={10} color="green" />
                                <br />
                                {checkOpp(player_id, match).opp_rating_gains}
                              </span>
                            ) : checkOpp(player_id, match).opp_rating_gains <
                              0 ? (
                              <span className="ms-2 negative-elo">
                                <CaretDownFill size={10} color="red" />
                                <br />
                                {checkOpp(player_id, match).opp_rating_gains}
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
                          <td
                            className="table-surface-elo"
                            id="opp-surface-elo"
                          >
                            {checkOpp(player_id, match).opp_surface_rating !=
                            2400 ? (
                              <>
                                {match.surface.toLowerCase() == "grass" ? (
                                  <span
                                    style={{ backgroundColor: "#3EBA7C" }}
                                    className="table-surface-elo-label"
                                  >
                                    {checkOpp(player_id, match)
                                      .opp_surface_rating -
                                      checkOpp(player_id, match)
                                        .opp_surface_rating_gains}
                                  </span>
                                ) : match.surface.toLowerCase() == "hard" ||
                                  match.surface.toLowerCase() == "carpet" ? (
                                  <span
                                    style={{ backgroundColor: "#3B9FB9" }}
                                    className="table-surface-elo-label"
                                  >
                                    {checkOpp(player_id, match)
                                      .opp_surface_rating -
                                      checkOpp(player_id, match)
                                        .opp_surface_rating_gains}
                                  </span>
                                ) : match.surface.toLowerCase() == "clay" ? (
                                  <span
                                    style={{ backgroundColor: "#E96513" }}
                                    className="table-surface-elo-label"
                                  >
                                    {checkOpp(player_id, match)
                                      .opp_surface_rating -
                                      checkOpp(player_id, match)
                                        .opp_surface_rating_gains}
                                  </span>
                                ) : (
                                  <> </>
                                )}
                              </>
                            ) : (
                              <>
                                {match.surface.toLowerCase() == "grass" ? (
                                  <span
                                    style={{ backgroundColor: "#3EBA7C" }}
                                    className="table-surface-elo-label"
                                  >
                                    {"< 2400"}
                                  </span>
                                ) : match.surface.toLowerCase() == "hard" ||
                                  match.surface.toLowerCase() == "carpet" ? (
                                  <span
                                    style={{ backgroundColor: "#3B9FB9" }}
                                    className="table-surface-elo-label"
                                  >
                                    {"< 2400"}
                                  </span>
                                ) : match.surface.toLowerCase() == "clay" ? (
                                  <span
                                    style={{ backgroundColor: "#E96513" }}
                                    className="table-surface-elo-label"
                                  >
                                    {"< 2400"}
                                  </span>
                                ) : (
                                  <> </>
                                )}
                              </>
                            )}

                            {checkOpp(player_id, match).opp_rating_gains > 0 ? (
                              <span className="ms-2 positive-elo">
                                <CaretUpFill size={10} color="green" />
                                <br />
                                {
                                  checkOpp(player_id, match)
                                    .opp_surface_rating_gains
                                }
                              </span>
                            ) : checkOpp(player_id, match)
                                .opp_surface_rating_gains < 0 ? (
                              <span className="ms-2 negative-elo">
                                <CaretDownFill size={10} color="red" />
                                <br />
                                {
                                  checkOpp(player_id, match)
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
                          <td className="table-tournament" id="tournament">
                            {match.tourney_name}
                          </td>
                          <td className="table-round" id="round">
                            {match.round}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col ms-5 ps-5">
              <div className="d-inline fw-500 pe-5">
                Ave. ELO (Opp.): {getStats(data, player_id).ave_ELO}
              </div>
              <div className="d-inline fw-500">Performance ELO: -</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
