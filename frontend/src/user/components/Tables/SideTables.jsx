import ReactCountryFlag from "react-country-flag";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import ClipLoader from "react-spinners/ClipLoader";
import TennisRatingGuide from "./TennisRatingGuide";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function toTitleCase(str) {
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

export default function () {
  const { players, records, api_isLoading } = useSelector((state) => state.api);

  //Default data
  useEffect(() => {
    setData([...players].sort(alphabetically(false, "overall_peak_rating")));
  }, [api_isLoading]);

  //Tabs
  const [toggleRecords, setToggleRecords] = useState(1);
  //Main data
  const [data, setData] = useState(players);
  var ctr = 1;

  //If loading
  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  if (data.length < 1) {
    return (
      <>
        <div className="w-25">
          {/* TOP 15 */}
          <h2 className="fs-4">Top 15 of All Time:</h2>
          <div className="row">
            <div className="col">
              <ClipLoader cssOverride={override} size={70} />
            </div>
            <TennisRatingGuide />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-25">
        {/* TOP 15 */}
        <h2 className="fs-4">Top 15 of All Time:</h2>
        <div className="row">
          <div className="col">
            <nav>
              <div
                className="nav nav-tabs pb-1 border-0"
                id="nav-tab"
                role="tablist"
              >
                <a
                  href="#/"
                  className={
                    toggleRecords === 1
                      ? "px-2 nav-item nav-link table-tab-active"
                      : "px-2 nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(1);
                    setData(
                      [...players].sort(
                        alphabetically(false, "overall_peak_rating")
                      )
                    );
                  }}
                >
                  Overall
                </a>
                <a
                  href="#/"
                  className={
                    toggleRecords === 2
                      ? "px-2 nav-item nav-link table-tab-active"
                      : "px-2 nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(2);
                    setData(
                      [...players].sort(
                        alphabetically(false, "hard_peak_rating")
                      )
                    );
                  }}
                >
                  Hard
                </a>
                <a
                  href="#/"
                  className={
                    toggleRecords === 3
                      ? "px-2 nav-item nav-link table-tab-active"
                      : "px-2 nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(3);
                    setData(
                      [...players].sort(
                        alphabetically(false, "clay_peak_rating")
                      )
                    );
                  }}
                >
                  Clay
                </a>
                <a
                  href="#/"
                  className={
                    toggleRecords === 4
                      ? "px-2 nav-item nav-link table-tab-active"
                      : "px-2 nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(4);
                    setData(
                      [...players].sort(
                        alphabetically(false, "grass_peak_rating")
                      )
                    );
                  }}
                >
                  Grass
                </a>
                <a
                  href="#/"
                  className={
                    toggleRecords === 5
                      ? "px-2 nav-item nav-link table-tab-active"
                      : "px-2 nav-item nav-link "
                  }
                  onClick={() => {
                    setToggleRecords(5);
                    setData(
                      [...players].sort(
                        alphabetically(false, "atp_peak_rating")
                      )
                    );
                  }}
                >
                  ATP
                </a>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <table
                  class="table table-borderless liverating-table-bg-white"
                  cellspacing="0"
                >
                  <thead>
                    <tr className="text-center">
                      <th style={{ width: "10%" }}>Rank</th>
                      <th style={{ width: "45%" }} className="text-start">
                        Name
                      </th>
                      <th style={{ width: "15%" }}>Peak</th>
                      <th style={{ width: "45%" }}>Date</th>
                    </tr>
                  </thead>
                  {toggleRecords === 1 ? (
                    <>
                      <tbody className="text-center">
                        {data != null ? (
                          <>
                            {data.slice(0, 15).map((player) => (
                              <tr>
                                <td id="rank">{ctr++}</td>
                                <td className="text-start" id="name">
                                  <ReactCountryFlag
                                    countryCode={player.player_id.substring(
                                      0,
                                      2
                                    )}
                                    style={{
                                      filter: "drop-shadow(0 0 0.12rem black)",
                                    }}
                                    svg
                                  />{" "}
                                  {"\xa0"}
                                  {"\xa0"}
                                  {"\xa0"}
                                  <span className="table-country">
                                    <a href={player.player_id}>
                                      {toTitleCase(player.player_name)}
                                    </a>
                                  </span>
                                </td>
                                <td id="elo_rating">
                                  {player.overall_peak_rating}
                                </td>
                                <td id="date">
                                  {player.overall_peak_rating_date == null ? (
                                    <></>
                                  ) : (
                                    player.overall_peak_rating_date.slice(0, 7)
                                  )}
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <h3>No data.</h3>
                        )}
                      </tbody>
                    </>
                  ) : toggleRecords === 2 ? (
                    <>
                      <tbody className="text-center">
                        {data != null ? (
                          <>
                            {data.slice(0, 15).map((player) => (
                              <tr>
                                <td id="rank">{ctr++}</td>
                                <td className="text-start" id="name">
                                  <ReactCountryFlag
                                    countryCode={player.player_id.substring(
                                      0,
                                      2
                                    )}
                                    style={{
                                      filter: "drop-shadow(0 0 0.12rem black)",
                                    }}
                                    svg
                                  />{" "}
                                  {"\xa0"}
                                  {"\xa0"}
                                  {"\xa0"}
                                  <span className="table-country">
                                    <a href={player.player_id}>
                                      {toTitleCase(player.player_name)}
                                    </a>
                                  </span>
                                </td>
                                <td id="elo_rating">
                                  {player.hard_peak_rating}
                                </td>
                                <td id="date">
                                  {player.hard_peak_rating_date == null ? (
                                    <></>
                                  ) : (
                                    player.hard_peak_rating_date.slice(0, 7)
                                  )}
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <h3>No data.</h3>
                        )}
                      </tbody>
                    </>
                  ) : toggleRecords === 3 ? (
                    <>
                      <tbody className="text-center">
                        {data != null ? (
                          <>
                            {data.slice(0, 15).map((player) => (
                              <tr>
                                <td id="rank">{ctr++}</td>
                                <td className="text-start" id="name">
                                  <ReactCountryFlag
                                    countryCode={player.player_id.substring(
                                      0,
                                      2
                                    )}
                                    style={{
                                      filter: "drop-shadow(0 0 0.12rem black)",
                                    }}
                                    svg
                                  />{" "}
                                  {"\xa0"}
                                  {"\xa0"}
                                  {"\xa0"}
                                  <span className="table-country">
                                    <a href={player.player_id}>
                                      {toTitleCase(player.player_name)}
                                    </a>
                                  </span>
                                </td>
                                <td id="elo_rating">
                                  {player.clay_peak_rating}
                                </td>
                                <td id="date">
                                  {player.clay_peak_rating_date == null ? (
                                    <></>
                                  ) : (
                                    player.clay_peak_rating_date.slice(0, 7)
                                  )}
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <h3>No data.</h3>
                        )}
                      </tbody>
                    </>
                  ) : toggleRecords === 4 ? (
                    <>
                      <tbody className="text-center">
                        {data != null ? (
                          <>
                            {data.slice(0, 15).map((player) => (
                              <tr>
                                <td id="rank">{ctr++}</td>
                                <td className="text-start" id="name">
                                  <ReactCountryFlag
                                    countryCode={player.player_id.substring(
                                      0,
                                      2
                                    )}
                                    style={{
                                      filter: "drop-shadow(0 0 0.12rem black)",
                                    }}
                                    svg
                                  />{" "}
                                  {"\xa0"}
                                  {"\xa0"}
                                  {"\xa0"}
                                  <span className="table-country">
                                    <a href={player.player_id}>
                                      {toTitleCase(player.player_name)}
                                    </a>
                                  </span>
                                </td>
                                <td id="elo_rating">
                                  {player.grass_peak_rating}
                                </td>
                                <td id="date">
                                  {player.grass_peak_rating_date == null ? (
                                    <></>
                                  ) : (
                                    player.grass_peak_rating_date.slice(0, 7)
                                  )}
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <h3>No data.</h3>
                        )}
                      </tbody>
                    </>
                  ) : toggleRecords === 5 ? (
                    <>
                      <tbody className="text-center">
                        {data != null ? (
                          <>
                            {data.slice(0, 15).map((player) => (
                              <tr>
                                <td id="rank">{ctr++}</td>
                                <td className="text-start" id="name">
                                  <ReactCountryFlag
                                    countryCode={player.player_id.substring(
                                      0,
                                      2
                                    )}
                                    style={{
                                      filter: "drop-shadow(0 0 0.12rem black)",
                                    }}
                                    svg
                                  />{" "}
                                  {"\xa0"}
                                  {"\xa0"}
                                  {"\xa0"}
                                  <span className="table-country">
                                    <a href={player.player_id}>
                                      {toTitleCase(player.player_name)}
                                    </a>
                                  </span>
                                </td>
                                <td id="elo_rating">
                                  {player.atp_peak_rating}
                                </td>
                                <td id="date">
                                  {player.atp_peak_rating_date == null ? (
                                    <></>
                                  ) : (
                                    player.atp_peak_rating_date.slice(0, 4) +
                                    "-" +
                                    player.atp_peak_rating_date.slice(4, 6)
                                  )}
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <h3>No data.</h3>
                        )}
                      </tbody>
                    </>
                  ) : (
                    <></>
                  )}
                </table>
              </div>
            </div>
          </div>
          <TennisRatingGuide />
        </div>
      </div>
    </>
  );
}
