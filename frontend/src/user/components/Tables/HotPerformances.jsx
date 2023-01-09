import { useState, useEffect, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function toTitleCase(str) {
  if (str.toLowerCase() === "mcenroe john") {
    return "McEnroe John";
  }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
function alphabetically(ascending, col) {
  return function (a, b) {
    a = a[col];
    b = b[col];

    if (a == null) {
      a = 0;
    }
    if (b == null) {
      a = 0;
    }
    // equal items sort equally
    if (a === b) {
      return 0;
    }

    // nulls sort after anything else
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }

    // otherwise, if we're ascending, lowest sorts first
    if (ascending) {
      return a < b ? -1 : 1;
    }

    // if descending, highest sorts first
    return a < b ? 1 : -1;
  };
}

function getPerformance(perf_data, player_id) {
  var sumOfAll = [];
  var sumOfAllSurface = [];
  var uncounted = 0;
  var wins = 0;
  var loses = 0;

  perf_data.forEach((match) => {
    var performanceELO = 0;
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
        if (match.loser_elo != null && match.loser_elo > 2350) {
          performanceELO += 300;
          //Add bonus
          if (Math.abs(p1 - p2) == 2) {
            performanceELO += 50;
          } else if (Math.abs(p1 - p2) == 3) {
            performanceELO += 100;
          }

          //Add sumOfAll
          if (match.loser_elo != null) {
            sumOfAll.push(
              match.loser_elo - match.loser_elo_gains + performanceELO
            );
            sumOfAllSurface.push(
              match.loser_elo_surface -
                match.loser_elo_surface_gains +
                performanceELO
            );
          }
        }
        wins++;
      } else if (match.loser_local_id == player_id) {
        if (match.winner_elo != null || match.winner_elo > 2350) {
          performanceELO -= 300;
          //Add bonus
          if (Math.abs(p1 - p2) == 2) {
            performanceELO -= 50;
          } else if (Math.abs(p1 - p2) == 3) {
            performanceELO -= 100;
          }

          //Add sumOfAll
          if (match.winner_elo != null) {
            sumOfAll.push(
              match.winner_elo - match.winner_elo_gains + performanceELO
            );
            sumOfAllSurface.push(
              match.winner_elo_surface -
                match.winner_elo_surface_gains +
                performanceELO
            );
          }
          loses++;
        }
      }
    } else {
      uncounted++;
    }
  });

  if (wins === 10 - uncounted) {
    return {
      perf_overall: Math.max(...sumOfAll),
      perf_surface: Math.max(...sumOfAllSurface),
    };
  } else if (loses === 10 - uncounted) {
    return {
      perf_overall: Math.min(...sumOfAll),
      perf_surface: Math.min(...sumOfAllSurface),
    };
  }
  return {
    perf_overall: sumOfAll.reduce((a, b) => a + b, 0) / sumOfAll.length,
    perf_surface: sumOfAllSurface.reduce((a, b) => a + b, 0) / sumOfAll.length,
  };
}

export default function HotPerformances() {
  const navigate = useNavigate();

  const [perf_data, setPerfData] = useState([]);
  const [category, setCategory] = useState("overall");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log("first");
    setIsLoading(true);
    //fetch perf_data from api and set it to perf_data
    //fetch(`http://localhost:5000/api/hotperformance/${category}`)
    fetch(`/api/hotperformance/${category}`)
      .then((res) => res.json())
      .then((json) => {
        var last10 = [];
        json.forEach((player) => {
          last10.push({
            player: player,
            performance: Math.ceil(
              category != "overall"
                ? getPerformance(
                    player[0].mostRecentGames
                      .filter(
                        (element) => element.surface?.toLowerCase() == category
                      )
                      .sort(
                        (a, b) =>
                          b.tourney_date - a.tourney_date ||
                          b.match_num - a.match_num
                      )
                      .splice(0, 10),
                    player[0]._id
                  ).perf_surface
                : getPerformance(
                    player[0].mostRecentGames
                      .sort(
                        (a, b) =>
                          b.tourney_date - a.tourney_date ||
                          b.match_num - a.match_num
                      )
                      .splice(0, 10),
                    player[0]._id
                  ).perf_overall
            ),
          });
        });
        setPerfData(
          last10.sort(alphabetically(false, "performance")).splice(0, 10)
        );
        setIsLoading(false);
      });
  }, [category]);

  if (perf_data === undefined || isLoading)
    return (
      <>
        <h2 className="fs-4">Last 10 Hot Performances:</h2>
        {/*FILLER*/}
        <nav>
          <div className="nav nav-tabs  border-0" role="tablist">
            <a
              href="#/"
              className={
                category == "overall"
                  ? "px-2 nav-item nav-link table-tab-gray"
                  : "px-2 nav-item nav-link"
              }
              onClick={() => {
                setCategory("overall");
              }}
            >
              Overall
            </a>
            <a
              href="#/"
              className={
                category == "hard"
                  ? "px-2 nav-item nav-link table-tab-hard"
                  : "px-2 nav-item nav-link"
              }
              onClick={() => {
                setCategory("hard");
              }}
            >
              Hard
            </a>
            <a
              href="#/"
              className={
                category == "clay"
                  ? "px-2 nav-item nav-link table-tab-clay"
                  : "px-2 nav-item nav-link"
              }
              onClick={() => {
                setCategory("clay");
              }}
            >
              Clay
            </a>
            <a
              href="#/"
              className={
                category == "grass"
                  ? "px-2 nav-item nav-link table-tab-grass"
                  : "px-2 nav-item nav-link"
              }
              onClick={() => {
                setCategory("grass");
              }}
            >
              Grass
            </a>
          </div>
        </nav>
        <table
          class="table table-borderless liverating-table-bg-white shadow-sm "
          cellspacing="0"
        >
          <thead>
            <tr className="text-center"></tr>
          </thead>
          <tbody className="container" style={{ height: 434 }}>
            <div
              class="row justify-content-center align-items-center"
              style={{ height: 434 }}
            >
              <ClipLoader />
            </div>
          </tbody>
        </table>
      </>
    );
  var ctr = 1;

  return (
    <>
      <h2 className="fs-4">Last 10 Hot Performances:</h2>
      {/*FILLER*/}
      <nav>
        <div className="nav nav-tabs  border-0">
          <a
            href="#/"
            className={
              category == "overall"
                ? "px-2 nav-item nav-link table-tab-gray"
                : "px-2 nav-item nav-link"
            }
            onClick={() => {
              setCategory("overall");
            }}
          >
            Overall
          </a>
          <a
            href="#/"
            className={
              category == "hard"
                ? "px-2 nav-item nav-link table-tab-hard"
                : "px-2 nav-item nav-link"
            }
            onClick={() => {
              setCategory("hard");
            }}
          >
            Hard
          </a>
          <a
            href="#/"
            className={
              category == "clay"
                ? "px-2 nav-item nav-link table-tab-clay"
                : "px-2 nav-item nav-link"
            }
            onClick={() => {
              setCategory("clay");
            }}
          >
            Clay
          </a>
          <a
            href="#/"
            className={
              category == "grass"
                ? "px-2 nav-item nav-link table-tab-grass"
                : "px-2 nav-item nav-link"
            }
            onClick={() => {
              setCategory("grass");
            }}
          >
            Grass
          </a>
        </div>
      </nav>
      <table
        class="table table-borderless liverating-table-bg-white shadow-sm "
        cellspacing="0"
      >
        <thead>
          <tr className="text-center">
            <th style={{ width: "1%" }}>Rank</th>
            <th style={{ width: "45%" }} className="text-start">
              Name
            </th>
            <th style={{ width: "15%" }}>Last 10</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {perf_data.map((player, index) => (
            <>
              <tr>
                <td>{ctr++}</td>
                <td className="text-start">
                  <ReactCountryFlag
                    countryCode={player.player[0]._id.substring(0, 2)}
                    style={{
                      filter: "drop-shadow(0 0 0.12rem black)",
                    }}
                    svg
                  />{" "}
                  {"\xa0"}
                  {"\xa0"}
                  {"\xa0"}
                  <span className="table-country">
                    <a
                      href="#/"
                      onClick={() =>
                        navigate(`./players/` + player.player[0]._id)
                      }
                    >
                      {toTitleCase(player.player[0].player_name)}
                    </a>
                  </span>
                </td>
                <td>
                  <span
                    title="Performance"
                    style={{
                      backgroundColor:
                        category == "hard"
                          ? "#015778"
                          : category == "clay"
                          ? "#E96513"
                          : category == "grass"
                          ? "#3EBA7C"
                          : "#000000",
                    }}
                    className="table-surface-elo-label"
                  >
                    <>{player.performance}</>
                  </span>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
