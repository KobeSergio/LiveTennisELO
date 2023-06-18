import ReactCountryFlag from "react-country-flag";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

function alph_average(ascending) {
  return function (a, b) {
    a =
      (a["hard_peak_rating"] + a["clay_peak_rating"] + a["grass_peak_rating"]) /
      3;
    b =
      (b["hard_peak_rating"] + b["clay_peak_rating"] + b["grass_peak_rating"]) /
      3;

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

export default function AllTimeTop() {
  const { top_players } = useSelector((state) => state.api);
  const navigate = useNavigate();
  //Default data
  useEffect(() => {
    setData([...top_players].sort(alph_average(false)));
  }, [top_players]);

  //Tabs
  const [toggleRecords, setToggleRecords] = useState(6);
  //Main data
  const [data, setData] = useState([...top_players].sort(alph_average(false)));
  var ctr = 1;

  if (data.length < 1) {
    return (
      <>
        {/* TOP 15 */}
        <h2 className="fs-4">Top 15's All-time:</h2>
        <div className="row">
          <div className="col">
            <nav>
              <div className="nav nav-tabs  border-0">
                <a
                  href="#/"
                  className={
                    toggleRecords === 6
                      ? "px-2 nav-item nav-link table-tab-gray"
                      : "px-2 nav-item nav-link "
                  }
                  onClick={() => {
                    setToggleRecords(6);
                    setData([...top_players].sort(alph_average(false)));
                  }}
                >
                  Average
                </a>
                <a
                  href="#/"
                  className={
                    toggleRecords === 1
                      ? "px-2 nav-item nav-link table-tab-gray"
                      : "px-2 nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(1);
                    setData(
                      [...top_players].sort(
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
                      ? "px-2 nav-item nav-link table-tab-hard"
                      : "px-2 nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(2);
                    setData(
                      [...top_players].sort(
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
                      ? "px-2 nav-item nav-link table-tab-clay"
                      : "px-2 nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(3);
                    setData(
                      [...top_players].sort(
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
                      [...top_players].sort(
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
                      ? "px-2 nav-item nav-link table-tab-gray"
                      : "px-2 nav-item nav-link "
                  }
                  onClick={() => {
                    setToggleRecords(5);
                    setData(
                      [...top_players].sort(
                        alphabetically(false, "atp_peak_rating")
                      )
                    );
                  }}
                >
                  ATP
                </a>
              </div>
            </nav>
            <div class="tab-content">
              <div class="tab-pane fade show active">
                <table
                  class="table table-borderless liverating-table-bg-white shadow-sm "
                  cellspacing="0"
                >
                  <tbody className="container" style={{ height: 434 }}>
                    <div
                      class="row justify-content-center align-items-center"
                      style={{ height: 434 }}
                    >
                      <ClipLoader />
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {/* TOP 15 */}
      <h2 className="fs-4">Top 15's All-time:</h2>
      <div className="row">
        <div className="col">
          <nav>
            <div className="nav nav-tabs  border-0">
              <a
                href="#/"
                className={
                  toggleRecords === 6
                    ? "px-2 nav-item nav-link table-tab-gray"
                    : "px-2 nav-item nav-link "
                }
                onClick={() => {
                  setToggleRecords(6);
                  setData([...top_players].sort(alph_average(false)));
                }}
              >
                Average
              </a>
              <a
                href="#/"
                className={
                  toggleRecords === 1
                    ? "px-2 nav-item nav-link table-tab-gray"
                    : "px-2 nav-item nav-link"
                }
                onClick={() => {
                  setToggleRecords(1);
                  setData(
                    [...top_players].sort(
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
                    ? "px-2 nav-item nav-link table-tab-hard"
                    : "px-2 nav-item nav-link"
                }
                onClick={() => {
                  setToggleRecords(2);
                  setData(
                    [...top_players].sort(
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
                    ? "px-2 nav-item nav-link table-tab-clay"
                    : "px-2 nav-item nav-link"
                }
                onClick={() => {
                  setToggleRecords(3);
                  setData(
                    [...top_players].sort(
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
                    [...top_players].sort(
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
                    ? "px-2 nav-item nav-link table-tab-gray"
                    : "px-2 nav-item nav-link "
                }
                onClick={() => {
                  setToggleRecords(5);
                  setData(
                    [...top_players].sort(
                      alphabetically(false, "atp_peak_rating")
                    )
                  );
                }}
              >
                ATP
              </a>
            </div>
          </nav>
          <div class="tab-content">
            <div class="tab-pane fade show active">
              <table
                class="table table-borderless liverating-table-bg-white shadow-sm "
                cellspacing="0"
              >
                <thead>
                  <tr className="text-center">
                    <th style={{ width: "1%" }}>Rank</th>
                    <th
                      style={
                        toggleRecords === 6
                          ? { width: "45%" }
                          : { width: "65%" }
                      }
                      className="text-start"
                    >
                      Name
                    </th>
                    <th style={{ width: "5%" }}>
                      {toggleRecords === 6 ? <>ELO</> : <>Peak</>}
                    </th>
                    <th
                      style={
                        toggleRecords === 6 ? { width: "0%" } : { width: "45%" }
                      }
                    >
                      {toggleRecords === 6 ? <></> : <>Date</>}
                    </th>
                  </tr>
                </thead>
                {toggleRecords === 1 ? (
                  <>
                    <tbody className="text-center">
                      {data != null ? (
                        <>
                          {data.slice(0, 15).map((player) => (
                            <tr>
                              <td>{ctr++}</td>
                              <td className="text-start">
                                <ReactCountryFlag
                                  countryCode={player.player_id.substring(0, 2)}
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
                                      navigate(`./players/` + player.player_id)
                                    }
                                  >
                                    {toTitleCase(player.player_name)}
                                  </a>
                                </span>
                              </td>
                              <td>
                                <span
                                  title="ELO"
                                  style={{
                                    backgroundColor: "#000000",
                                  }}
                                  className="table-surface-elo-label"
                                >
                                  {player.overall_peak_rating}
                                </span>
                              </td>
                              <td>
                                {player.overall_peak_rating_date == null ? (
                                  <></>
                                ) : (
                                  <>
                                    {parseDate(player.overall_peak_rating_date)}
                                  </>
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
                              <td>{ctr++}</td>
                              <td className="text-start">
                                <ReactCountryFlag
                                  countryCode={player.player_id.substring(0, 2)}
                                  style={{
                                    filter: "drop-shadow(0 0 0.12rem black)",
                                  }}
                                  svg
                                />{" "}
                                {"\xa0"}
                                {"\xa0"}
                                {"\xa0"}
                                <span className="table-country">
                                  <a href={`./players/` + player.player_id}>
                                    {toTitleCase(player.player_name)}
                                  </a>
                                </span>
                              </td>
                              <td>
                                <span
                                  title="Peak"
                                  style={{
                                    backgroundColor: "#015778",
                                  }}
                                  className="table-surface-elo-label"
                                >
                                  {player.hard_peak_rating}
                                </span>
                              </td>
                              <td>
                                {player.hard_peak_rating_date == null ? (
                                  <></>
                                ) : (
                                  <>{parseDate(player.hard_peak_rating_date)}</>
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
                              <td>{ctr++}</td>
                              <td className="text-start">
                                <ReactCountryFlag
                                  countryCode={player.player_id.substring(0, 2)}
                                  style={{
                                    filter: "drop-shadow(0 0 0.12rem black)",
                                  }}
                                  svg
                                />{" "}
                                {"\xa0"}
                                {"\xa0"}
                                {"\xa0"}
                                <span className="table-country">
                                  <a href={`./players/` + player.player_id}>
                                    {toTitleCase(player.player_name)}
                                  </a>
                                </span>
                              </td>
                              <td>
                                <span
                                  title="Performance"
                                  style={{
                                    backgroundColor: "#E96513",
                                  }}
                                  className="table-surface-elo-label"
                                >
                                  {player.clay_peak_rating}
                                </span>
                              </td>
                              <td>
                                {player.clay_peak_rating_date == null ? (
                                  <></>
                                ) : (
                                  <>{parseDate(player.clay_peak_rating_date)}</>
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
                              <td>{ctr++}</td>
                              <td className="text-start">
                                <ReactCountryFlag
                                  countryCode={player.player_id.substring(0, 2)}
                                  style={{
                                    filter: "drop-shadow(0 0 0.12rem black)",
                                  }}
                                  svg
                                />{" "}
                                {"\xa0"}
                                {"\xa0"}
                                {"\xa0"}
                                <span className="table-country">
                                  <a href={`./players/` + player.player_id}>
                                    {toTitleCase(player.player_name)}
                                  </a>
                                </span>
                              </td>
                              <td>
                                <span
                                  title="Performance"
                                  style={{
                                    backgroundColor: "#3EBA7C",
                                  }}
                                  className="table-surface-elo-label"
                                >
                                  {player.grass_peak_rating}
                                </span>
                              </td>
                              <td>
                                {player.grass_peak_rating_date == null ? (
                                  <></>
                                ) : (
                                  <>
                                    {parseDate(player.grass_peak_rating_date)}
                                  </>
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
                              <td>{ctr++}</td>
                              <td className="text-start">
                                <ReactCountryFlag
                                  countryCode={player.player_id.substring(0, 2)}
                                  style={{
                                    filter: "drop-shadow(0 0 0.12rem black)",
                                  }}
                                  svg
                                />{" "}
                                {"\xa0"}
                                {"\xa0"}
                                {"\xa0"}
                                <span className="table-country">
                                  <a href={`./players/` + player.player_id}>
                                    {toTitleCase(player.player_name)}
                                  </a>
                                </span>
                              </td>
                              <td>
                                <span
                                  title="Performance"
                                  style={{
                                    backgroundColor: "#000000",
                                  }}
                                  className="table-surface-elo-label"
                                >
                                  {player.atp_peak_rating}
                                </span>
                              </td>
                              <td>
                                {player.atp_peak_rating_date == null ? (
                                  <></>
                                ) : (
                                  parseDate(player.atp_peak_rating_date)
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
                ) : toggleRecords === 6 ? (
                  <>
                    <tbody className="text-center">
                      {data != null ? (
                        <>
                          {data.slice(0, 15).map((player) => (
                            <tr>
                              <td>{ctr++}</td>
                              <td className="text-start">
                                <ReactCountryFlag
                                  countryCode={player.player_id.substring(0, 2)}
                                  style={{
                                    filter: "drop-shadow(0 0 0.12rem black)",
                                  }}
                                  svg
                                />{" "}
                                {"\xa0"}
                                {"\xa0"}
                                {"\xa0"}
                                <span className="table-country">
                                  <a href={`./players/` + player.player_id}>
                                    {toTitleCase(player.player_name)}
                                  </a>
                                </span>
                              </td>
                              <td>
                                <span
                                  title="Performance"
                                  style={{
                                    backgroundColor: "#000000",
                                  }}
                                  className="table-surface-elo-label"
                                >
                                  {Math.floor(
                                    (player.overall_peak_rating +
                                      player.hard_peak_rating +
                                      player.clay_peak_rating +
                                      player.grass_peak_rating) /
                                      4
                                  )}
                                </span>
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
      </div>
    </>
  );
}
