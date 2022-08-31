import { SurfaceLegend } from "../Legend";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons";
import { useEffect } from "react";
import { AddHighlight, ShowHighlight } from "./Highlight";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import e from "cors";

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

function arrangeScore(player_id, match) {
  try {
    var set = match.score.split(" ");
  } catch (error) {
    var set = match.score;
  }
  var fixed = [];
  if (match.winner_local_id == player_id) {
    return match.score;
  } else {
    try {
      if (set.length > 1) {
        set.forEach((score) => {
          var temp = "";
          temp = score[0];
          try {
            score = score.replaceAt(0, score[2]);
            score = score.replaceAt(2, temp);
          } catch {
            console.log("ha");
          }
          fixed.push(score);
        });
        return fixed.join([" "]);
      }
    } catch (error) {
      return match.score;
    }
  }
}

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

function getPerformance(data, player_id) {
  var performanceELO = 0;
  var sumOfAll = 0;
  var sumOfAllSurface = 0;
  var uncounted = 0;

  data.forEach((match) => {
    var p1 = 0;
    var p2 = 0;

    if (match.score != "W/O") {
      //Instantiate rounds
      try {
        var set = match.score.split(" ");
        set.forEach((round) => {
          if (round[0] > round[2]) {
            p1++;
          } else {
            p2++;
          }
        });
      } catch (error) {
        var set = match.score;
      }

      //Add win or lose
      if (match.winner_local_id == player_id) {
        performanceELO += 300;
        //Add bonus
        if (Math.abs(p1 - p2) == 2) {
          performanceELO += 50;
        } else if (Math.abs(p1 - p2) == 3) {
          performanceELO += 100;
        }

        //Add sumOfAll
        if (match.loser_elo == null) {
          sumOfAll += 2400;
          sumOfAllSurface += 2400;
        } else {
          sumOfAll += match.loser_elo - match.loser_elo_gains;
          sumOfAllSurface +=
            match.loser_elo_surface - match.loser_elo_surface_gains;
        }
      } else if (match.loser_local_id == player_id) {
        performanceELO -= 300;
        //Add bonus
        if (Math.abs(p1 - p2) == 2) {
          performanceELO -= 50;
        } else if (Math.abs(p1 - p2) == 3) {
          performanceELO -= 100;
        }

        //Add sumOfAll
        if (match.winner_elo == null) {
          sumOfAll += 2400;
          sumOfAllSurface += 2400;
        } else {
          sumOfAll += match.winner_elo - match.winner_elo_gains;
          sumOfAllSurface +=
            match.winner_elo_surface - match.winner_elo_surface_gains;
        }
      }
    } else {
      uncounted++;
    }
  });

  return {
    perf_overall: (sumOfAll + performanceELO) / (data.length - uncounted),
    perf_surface:
      (sumOfAllSurface + performanceELO) / (data.length - uncounted),
  };
}

function getStats(data, player_id) {
  var opp_ratings = [];
  var opp_surface_ratings = [];
  var uncounted = 0;
  data.forEach((match) => {
    if (match.score != "W/O") {
      if (match.winner_local_id == player_id) {
        if (match.loser_elo == null) {
          opp_ratings.push(2400);
          opp_surface_ratings.push(2400);
        } else {
          opp_ratings.push(match.loser_elo - match.loser_elo_gains);
          opp_surface_ratings.push(
            match.loser_elo_surface - match.loser_elo_surface_gains
          );
        }
      } else if (match.loser_local_id == player_id) {
        if (match.winner_elo == null) {
          opp_ratings.push(2400);
          opp_surface_ratings.push(2400);
        } else {
          opp_ratings.push(match.winner_elo - match.winner_elo_gains);
          opp_surface_ratings.push(
            match.winner_elo_surface - match.winner_elo_surface_gains
          );
        }
      }
    }
  });

  return {
    ave_ELO: opp_ratings.reduce((a, b) => a + b, 0) / opp_ratings.length,
    ave_surface_ELO:
      opp_surface_ratings.reduce((a, b) => a + b, 0) /
      opp_surface_ratings.length,
  };
}

export function PlayerMatches() {
  const { player_id } = useParams();
  const { player_details, player_matches } = useSelector(
    (state) => state.player
  );

  const [data, setData] = useState(player_matches);

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

  var currentMatch = "";
  var currentDate = "";
  const [currentSurface, setCurrentSurface] = useState("All Surface");
  return (
    <>
      <div
        style={{ overflow: "auto" }}
        className="bg-white container-fluid h-100 shadow rounded pt-1 mb-5 mt-5"
      >
        <div className="row h-100 py-3 rounded">
          <h1 className="fs-4  mb-0">
            Last 10 matches of {player_details[0].player_name}
          </h1>
          <div className="container px-3 py-0 pt-3">
            <h5>
              <b>Match Performance:</b>
            </h5>
            <hr></hr>
            <div className="row pb-2">
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-7">
                    <b>Overall ELO:</b>
                  </div>
                  <div className="col">
                    <span
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "black",
                        outline: "1px solid black",
                      }}
                      className="table-surface-elo-label"
                    >
                      {player_details[0].overall_rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-7">
                    <b>Hard ELO:</b>{" "}
                  </div>
                  <div className="col">
                    <span
                      style={{ backgroundColor: "#3B9FB9" }}
                      className="table-surface-elo-label"
                    >
                      {player_details[0].hard_rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-7">
                    <b>Clay ELO:</b>{" "}
                  </div>
                  <div className="col">
                    <span
                      style={{ backgroundColor: "#E96513" }}
                      className="table-surface-elo-label"
                    >
                      {player_details[0].clay_rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-7">
                    <b>Grass ELO:</b>
                  </div>
                  <div className="col">
                    <span
                      style={{ backgroundColor: "#3EBA7C" }}
                      className="table-surface-elo-label"
                    >
                      {player_details[0].grass_rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-7">
                    <b>Overall Performance:</b>
                  </div>
                  <div className="col">
                    <span
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "black",
                        outline: "1px solid black",
                      }}
                      className="table-surface-elo-label"
                    >
                      {Math.ceil(
                        getPerformance(
                          [...player_matches]
                            .sort(
                              (a, b) =>
                                b.tourney_date - a.tourney_date ||
                                b.match_num - a.match_num
                            )
                            .splice(0, 10),
                          player_id
                        ).perf_overall
                      )}
                    </span>
                    {Math.ceil(
                      getPerformance(
                        [...player_matches]
                          .sort(
                            (a, b) =>
                              b.tourney_date - a.tourney_date ||
                              b.match_num - a.match_num
                          )
                          .splice(0, 10),
                        player_id
                      ).perf_overall
                    ) > player_details[0].overall_rating ? (
                      <span className="ms-2 positive-elo">
                        <CaretUpFill size={10} color="green" /> {"\xa0"}
                        {Math.ceil(
                          getPerformance(
                            [...player_matches]
                              .sort(
                                (a, b) =>
                                  b.tourney_date - a.tourney_date ||
                                  b.match_num - a.match_num
                              )
                              .splice(0, 10),
                            player_id
                          ).perf_overall
                        ) - player_details[0].overall_rating}
                      </span>
                    ) : (
                      <span className="ms-2 negative-elo">
                        <CaretDownFill size={10} color="red" />
                        {"\xa0"}
                        {Math.ceil(
                          getPerformance(
                            [...player_matches]
                              .sort(
                                (a, b) =>
                                  b.tourney_date - a.tourney_date ||
                                  b.match_num - a.match_num
                              )
                              .splice(0, 10),
                            player_id
                          ).perf_overall
                        ) - player_details[0].overall_rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-7">
                    <b>
                      Hard Performance: {"\xa0"}
                      {"\xa0"}
                    </b>
                  </div>
                  <div className="col">
                    <span
                      style={{ backgroundColor: "#3B9FB9" }}
                      className="table-surface-elo-label"
                    >
                      {Math.ceil(
                        getPerformance(
                          [...player_matches]
                            .filter((element) => element.surface == "Hard")
                            .sort(
                              (a, b) =>
                                b.tourney_date - a.tourney_date ||
                                b.match_num - a.match_num
                            )
                            .splice(0, 10),
                          player_id
                        ).perf_surface
                      )}
                    </span>
                    {Math.ceil(
                      getPerformance(
                        [...player_matches]
                          .filter((element) => element.surface == "Hard")
                          .sort(
                            (a, b) =>
                              b.tourney_date - a.tourney_date ||
                              b.match_num - a.match_num
                          )
                          .splice(0, 10),
                        player_id
                      ).perf_surface
                    ) > player_details[0].hard_rating ? (
                      <span className="ms-2 positive-elo">
                        <CaretUpFill size={10} color="green" />
                        {"\xa0"}
                        {Math.ceil(
                          getPerformance(
                            [...player_matches]
                              .filter((element) => element.surface == "Hard")
                              .sort(
                                (a, b) =>
                                  b.tourney_date - a.tourney_date ||
                                  b.match_num - a.match_num
                              )
                              .splice(0, 10),
                            player_id
                          ).perf_surface
                        ) - player_details[0].hard_rating}
                      </span>
                    ) : (
                      <span className="ms-2 negative-elo">
                        <CaretDownFill size={10} color="red" />
                        {"\xa0"}
                        {Math.ceil(
                          getPerformance(
                            [...player_matches]
                              .filter((element) => element.surface == "Hard")
                              .sort(
                                (a, b) =>
                                  b.tourney_date - a.tourney_date ||
                                  b.match_num - a.match_num
                              )
                              .splice(0, 10),
                            player_id
                          ).perf_surface
                        ) - player_details[0].hard_rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-7">
                    <b>
                      Clay Performance: {"\xa0"}
                      {"\xa0"}
                    </b>
                  </div>
                  <div className="col">
                    <span
                      style={{ backgroundColor: "#E96513" }}
                      className="table-surface-elo-label"
                    >
                      {Math.ceil(
                        getPerformance(
                          [...player_matches]
                            .filter((element) => element.surface == "Clay")
                            .sort(
                              (a, b) =>
                                b.tourney_date - a.tourney_date ||
                                b.match_num - a.match_num
                            )
                            .splice(0, 10),
                          player_id
                        ).perf_surface
                      )}
                    </span>
                    {Math.ceil(
                      getPerformance(
                        [...player_matches]
                          .filter((element) => element.surface == "Clay")
                          .sort(
                            (a, b) =>
                              b.tourney_date - a.tourney_date ||
                              b.match_num - a.match_num
                          )
                          .splice(0, 10),
                        player_id
                      ).perf_surface
                    ) > player_details[0].clay_rating ? (
                      <span className="ms-2 positive-elo">
                        <CaretUpFill size={10} color="green" />
                        {"\xa0"}
                        {Math.ceil(
                          getPerformance(
                            [...player_matches]
                              .filter((element) => element.surface == "Clay")
                              .sort(
                                (a, b) =>
                                  b.tourney_date - a.tourney_date ||
                                  b.match_num - a.match_num
                              )
                              .splice(0, 10),
                            player_id
                          ).perf_surface
                        ) - player_details[0].clay_rating}
                      </span>
                    ) : (
                      <span className="ms-2 negative-elo">
                        <CaretDownFill size={10} color="red" />
                        {"\xa0"}
                        {Math.ceil(
                          getPerformance(
                            [...player_matches]
                              .filter((element) => element.surface == "Clay")
                              .sort(
                                (a, b) =>
                                  b.tourney_date - a.tourney_date ||
                                  b.match_num - a.match_num
                              )
                              .splice(0, 10),
                            player_id
                          ).perf_surface
                        ) - player_details[0].clay_rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-7">
                    <b>
                      Grass Performance: {"\xa0"}
                      {"\xa0"}
                    </b>
                  </div>
                  <div className="col">
                    <span
                      style={{ backgroundColor: "#3EBA7C" }}
                      className="table-surface-elo-label"
                    >
                      {Math.ceil(
                        getPerformance(
                          [...player_matches]
                            .filter(
                              (element) =>
                                element.surface  == "Grass"
                            )
                            .sort(
                              (a, b) =>
                                b.tourney_date - a.tourney_date ||
                                b.match_num - a.match_num
                            )
                            .splice(0, 10),
                          player_id
                        ).perf_surface
                      )}
                    </span>
                    {Math.ceil(
                      getPerformance(
                        [...player_matches]
                          .filter(
                            (element) =>
                              element.surface == "Grass"
                          )
                          .sort(
                            (a, b) =>
                              b.tourney_date - a.tourney_date ||
                              b.match_num - a.match_num
                          )
                          .splice(0, 10),
                        player_id
                      ).perf_surface
                    ) > player_details[0].grass_rating ? (
                      <span className="ms-2 positive-elo">
                        <CaretUpFill size={10} color="green" />
                        {"\xa0"}
                        {Math.ceil(
                          getPerformance(
                            [...player_matches]
                              .filter(
                                (element) =>
                                  element.surface  == "Grass"
                              )
                              .sort(
                                (a, b) =>
                                  b.tourney_date - a.tourney_date ||
                                  b.match_num - a.match_num
                              )
                              .splice(0, 10),
                            player_id
                          ).perf_surface
                        ) - player_details[0].grass_rating}
                      </span>
                    ) : (
                      <span className="ms-2 negative-elo">
                        <CaretDownFill size={10} color="red" />
                        {"\xa0"}
                        {Math.ceil(
                          getPerformance(
                            [...player_matches]
                              .filter(
                                (element) =>
                                  element.surface  == "Grass"
                              )
                              .sort(
                                (a, b) =>
                                  b.tourney_date - a.tourney_date ||
                                  b.match_num - a.match_num
                              )
                              .splice(0, 10),
                            player_id
                          ).perf_surface
                        ) - player_details[0].grass_rating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
          <main className="ms-2">
            <h5>
              <b>Match History:</b>
            </h5>
            <div className="ms-auto d-flex">
              <Dropdown className="border-0 dropdown mx-2 rounded-3">
                <Dropdown.Toggle variant="white" id="dropdown-basic" size="lg">
                  {currentSurface}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setCurrentSurface("All Surface");
                      setData(
                        [...player_matches]
                          .sort(
                            (a, b) =>
                              b.tourney_date - a.tourney_date ||
                              b.match_num - a.match_num
                          )
                          .splice(0, 10)
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
                          .filter(
                            (element) => element.surface  == "Hard"
                          )
                          .sort(
                            (a, b) =>
                              b.tourney_date - a.tourney_date ||
                              b.match_num - a.match_num
                          )
                          .splice(0, 10)
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
                          .filter(
                            (element) => element.surface  == "Clay"
                          )
                          .sort(
                            (a, b) =>
                              b.tourney_date - a.tourney_date ||
                              b.match_num - a.match_num
                          )
                          .splice(0, 10)
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
                          .filter(
                            (element) =>
                              element.surface  == "Grass"
                          )
                          .sort(
                            (a, b) =>
                              b.tourney_date - a.tourney_date ||
                              b.match_num - a.match_num
                          )
                          .splice(0, 10)
                      );
                    }}
                    href="#/"
                  >
                    Grass
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="ms-auto d-flex align-items-start py-2">
                <SurfaceLegend />
              </div>
            </div>
            <table className="table table-borderless text-center mb-0">
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
                  <th style={{ minWidth: 100 }} scope="col">
                    <b>Opp. Overall Rating</b>
                  </th>
                  <th style={{ minWidth: 100 }} scope="col">
                    <b>Opp. Surface ELO</b>
                  </th>
                  <th
                    style={{ minWidth: 200 }}
                    className="text-start"
                    scope="col"
                  >
                    <b>Score</b>
                  </th>
                  <th style={{ minWidth: 200 }} scope="col">
                    <b>Tournament</b>
                  </th>
                  <th scope="col">
                    <b>Round</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((match) => (
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
                        <span className="me-2 highlights-button">
                          {match.highlight != "" ? (
                            <ShowHighlight
                              props={match._id}
                              src={match.highlight}
                            />
                          ) : (
                            <AddHighlight props={match._id} />
                          )}
                        </span>
                        {checkOpp(player_id, match).result === "W" ? (
                          //GREEN SPAN
                          <span
                            style={{
                              backgroundColor: "#9DDEBD",
                              padding: ".2em 8px .3em",
                            }}
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
                                `./` + checkOpp(player_id, match).opponent_id
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
                        {checkOpp(player_id, match).opp_rating != 2400 &&
                        checkOpp(player_id, match).opp_rating != null &&
                        checkOpp(player_id, match).opp_rating > 1
                          ? checkOpp(player_id, match).opp_rating -
                            checkOpp(player_id, match).opp_rating_gains
                          : "< 2400"}
                        {checkOpp(player_id, match).opp_rating_gains > 0 ? (
                          <span className="ms-2 positive-elo">
                            <CaretUpFill size={10} color="green" />
                            <br />
                            {checkOpp(player_id, match).opp_rating_gains}
                          </span>
                        ) : checkOpp(player_id, match).opp_rating_gains < 0 ? (
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
                      <td className="table-surface-elo" id="opp-surface-elo">
                        {checkOpp(player_id, match).opp_surface_rating !=
                        2400 ? (
                          <>
                            {match.surface  == "Grass" ? (
                              <span
                                style={{ backgroundColor: "#3EBA7C" }}
                                className="table-surface-elo-label"
                              >
                                {checkOpp(player_id, match).opp_surface_rating -
                                  checkOpp(player_id, match)
                                    .opp_surface_rating_gains}
                              </span>
                            ) : match.surface  == "Hard" ||
                              match.surface  == "Carpet" ? (
                              <span
                                style={{ backgroundColor: "#3B9FB9" }}
                                className="table-surface-elo-label"
                              >
                                {checkOpp(player_id, match).opp_surface_rating -
                                  checkOpp(player_id, match)
                                    .opp_surface_rating_gains}
                              </span>
                            ) : match.surface == "Clay" ? (
                              <span
                                style={{ backgroundColor: "#E96513" }}
                                className="table-surface-elo-label"
                              >
                                {checkOpp(player_id, match).opp_surface_rating -
                                  checkOpp(player_id, match)
                                    .opp_surface_rating_gains}
                              </span>
                            ) : (
                              <> </>
                            )}
                          </>
                        ) : (
                          <>
                            {match.surface  == "Grass" ? (
                              <span
                                style={{ backgroundColor: "#3EBA7C" }}
                                className="table-surface-elo-label"
                              >
                                {"< 2400"}
                              </span>
                            ) : match.surface  == "Hard" ||
                              match.surface  == "Carpet" ? (
                              <span
                                style={{ backgroundColor: "#3B9FB9" }}
                                className="table-surface-elo-label"
                              >
                                {"< 2400"}
                              </span>
                            ) : match.surface  == "Clay" ? (
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
                        {arrangeScore(player_id, match)}
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
                <tr>
                  <td className="text-start" colSpan={100}>
                    <hr className="mb-0" />
                    {/* <h1 className="fs-5 fw-bold pb-2">Match Stats:</h1> */}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <b>Ave. Opp Overall ELO:</b> <br /> <br />
                    {Math.ceil(getStats(data, player_id).ave_ELO)}
                  </td>
                  <td>
                    <b>Ave. Opp Surface ELO:</b>
                    <br /> <br />
                    {Math.ceil(getStats(data, player_id).ave_surface_ELO)}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </>
  );
}
