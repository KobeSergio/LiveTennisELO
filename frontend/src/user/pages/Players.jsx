import React from "react";
import bg_img from "../img/bg-charts2.png";
import {
  Download,
  Search,
  TrashFill,
  CaretDownFill,
  CaretUpFill,
} from "react-bootstrap-icons";
import ReactCountryFlag from "react-country-flag";
import Pagination from "../components/Pagination";
import { SurfaceLegend } from "../components/Legend/SurfaceLegend";

//Backend
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadPlayers, resetPlayer } from "../../features/api/apiSlice";
import ClipLoader from "react-spinners/ClipLoader";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";

function computeStatus(dateString) {
  if (dateString == null) {
    return "unk";
  }
  var mydate = new Date();
  if (!dateString.includes("-") && !dateString.includes("/")) {
    mydate = new Date(
      dateString.substring(0, 4),
      dateString.substring(4, 6),
      dateString.substring(6, 8)
    );
  } else {
    if (dateString.includes("-")) {
      var newdate = dateString.split(" ")[0].split("-");
      mydate = new Date(
        newdate[0], //Year
        newdate[1], //Month
        newdate[2] // Day
      );
    } else {
      var newdate = dateString.split(" ")[0].split("/");
      mydate = new Date(
        newdate[2], //Year
        newdate[0], //Month
        newdate[1] // Day
      );
    }
  }

  var dateToday = new Date();
  var diff = dateToday.getFullYear() - mydate.getFullYear();
  return Math.abs(diff) >= 1 && Math.abs(diff) <= 2
    ? "INACT"
    : Math.abs(diff) < 1
    ? "Active"
    : "RET";
}

function toTitleCase(str) {
  var parsed = str;

  if (parsed.slice(0, 3).toLowerCase() === "zz_") {
    parsed = parsed.slice(3);
  }

  if (parsed.toLowerCase() === "mcenroe john") {
    return "McEnroe John";
  }

  return parsed.replace(/\w\S*/g, function (txt) {
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

function Players() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Redirect if not logged in
  const { top_players, api_isLoading } = useSelector((state) => state.api);

  const [data, setData] = useState([]);
  const [order, setOrder] = useState("DSC");
  const opts = [];

  useEffect(() => {
    setData(top_players);
    top_players.forEach((player) =>
      opts.push({ value: player.player_id, label: player.player_name })
    );
    setPlayers(opts);
  }, [top_players]);

  const onSearch = (e) => {
    setOrder("ASC");
    if (e.target.value != "") {
      if (e.target.value.length != 2) {
        setData(
          top_players.filter((o) =>
            Object.keys(o).some((k) =>
              String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
            )
          )
        );
      } else {
        setData(
          top_players.filter((o) =>
            Object.keys(o).some((k) =>
              String(o[k])
                .toLowerCase()
                .includes(e.target.value.toLowerCase() + "0")
            )
          )
        );
      }
    } else {
      setData([...top_players]);
    }
  };

  const sorting = (col) => {
    setColumn(col);
    if (col != column) {
      setData([...data].sort(alphabetically(false, col)));
      setOrder("ASC");
    } else {
      if (order === "ASC") {
        setData([...data].sort(alphabetically(true, col)));
        setOrder("DSC");
      } else if (order === "DSC") {
        setData([...data].sort(alphabetically(false, col)));
        setOrder("ASC");
      }
    }
  };

  useEffect(() => {
    dispatch(resetPlayer());
    dispatch(loadPlayers());
  }, [navigate]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [DataPerPage, setDataPerPage] = useState(50);
  //Sorting
  const [column, setColumn] = useState("");
  //Get index of the last Data
  const indexOfLastData = currentPage * DataPerPage;
  const indexOfFirstData = indexOfLastData - DataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  //Select Box
  const [playerOptions, setPlayers] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const handleInputChange = useCallback((typedOption) => {
    if (typedOption.length > 2) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, []);

  const handleSelect = (selectedOption) => {
    setSelectedPlayers(
      Array.isArray(selectedOption) ? selectedOption.map((x) => x.value) : []
    );
    console.log(selectedOption);
    if (selectedPlayers.length > 0) {
      navigate(
        `/players/H2H?player_ids=${selectedPlayers[0]},${selectedOption[1].value}`
      );
    }
  };

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };
  useEffect(() => {
    setOrder("ASC");
  }, []);
  
  if (api_isLoading) {
    return <ClipLoader cssOverride={override} size={70} />;
  }

  return (
    <div className="charts-bg" style={{ backgroundImage: `url(${bg_img})` }}>
      <div className="px-4 py-4">
        <div className="row">
          <div className="ms-2">
            <h1 className="fw-bold fs-4">Player's Archives</h1>
            <p>
              Welcome to player's archives! Search for your favarite player
              here.
            </p>
          </div>
          {/* main search + filters */}
          <div className="row pt-3 pb-3  ">
            <div className="col-xs-12 col-lg-9 ">
              <div style={{ width: "400px" }}>
                Search:
                <div className="input-group">
                  <input
                    className="form-control border border-dark dropdown"
                    type="text"
                    placeholder="Search from table"
                    aria-label="Search Player"
                    onChange={onSearch}
                    width={300}
                  />
                  <span className="input-group-button">
                    <span
                      className="btn btn-green search-btn "
                      style={{ cursor: "pointer" }}
                    >
                      <Search color="white" className="fs-7" />
                    </span>
                  </span>
                </div>
              </div>
              <div className="input-group" style={{ width: "100%" }}>
                <p className="p-0" style={{ color: "gray", fontSize: 14 }}>
                  For searching by country, please indicate the country code
                  only.{" "}
                </p>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3">
              <div style={{ width: "auto" }}>
                H2H:
                <Select
                  placeholder={"Select Players..."}
                  closeMenuOnSelect={false}
                  components={{
                    makeAnimated: () => true,
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  defaultValue={[]}
                  isMulti
                  options={showOptions ? playerOptions : []}
                  menuIsOpen={showOptions ? true : false}
                  onInputChange={handleInputChange}
                  onChange={handleSelect}
                  isOptionDisabled={() => selectedPlayers.length >= 2}
                />
                <p className="p-0" style={{ color: "gray", fontSize: 14 }}>
                  Search for two players to have their H2H report.{" "}
                </p>
              </div>
            </div>
          </div>
          {/* utilities */}
          <div className="input-group py-2">
            <Dropdown className="border border-dark dropdown rounded-3">
              <Dropdown.Toggle
                className="o40"
                variant="white"
                id="dropdown-basic"
                size="sm"
              >
                {DataPerPage} per page
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setDataPerPage(50)} href="#">
                  50 per page
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDataPerPage(100)} href="#">
                  100 per page
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDataPerPage(200)} href="#">
                  200 per page
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setDataPerPage(data.length)}
                  href="#"
                >
                  All
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="ms-auto d-flex align-items-start">
              <SurfaceLegend />
            </div>
          </div>
          {/* tables */}
          <div className="table-responsive-xl">
            <table className="table liverating-table-bg-white table-hover rounded-3 text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <a style={{ color: "inherit", fontWeight: 700 }}>
                      Country
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                    </a>
                  </th>
                  <th
                    onClick={() => sorting("player_name")}
                    scope="col"
                    style={{ textAlign: "left" }}
                  >
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Name
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "player_name" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "player_name" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th onClick={() => sorting("atp_rating")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      ATP
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "atp_rating" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "atp_rating" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th onClick={() => sorting("atp_peak_rating")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      ATP Peak
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "atp_peak_rating" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "atp_peak_rating" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th onClick={() => sorting("overall_rating")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Overall
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "overall_rating" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "overall_rating" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th
                    onClick={() => sorting("overall_peak_rating")}
                    scope="col"
                  >
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Overall Peak
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "overall_peak_rating" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "overall_peak_rating" &&
                        order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th onClick={() => sorting("hard_rating")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Hard
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "hard_rating" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "hard_rating" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th onClick={() => sorting("hard_peak_rating")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Hard Peak
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "hard_peak_rating" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "hard_peak_rating" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th onClick={() => sorting("clay_rating")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Clay
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "clay_rating" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "clay_rating" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th onClick={() => sorting("clay_peak_rating")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Clay Peak
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "clay_peak_rating" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "clay_peak_rating" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th onClick={() => sorting("grass_rating")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Grass
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "grass_rating" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "grass_rating" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th onClick={() => sorting("grass_peak_rating")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Grass Peak
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "grass_peak_rating" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "grass_peak_rating" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}{" "}
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData != null ? (
                  <>
                    {currentData.map((player, index) => (
                      <tr
                        style={{ transform: "rotate(0)" }}
                        onClick={() => navigate(player.player_id)}
                      >
                        <th scope="row">
                          <a
                            href="#"
                            className="stretched-link"
                            style={{ color: "inherit" }}
                          >
                            {order === "DSC"
                              ? data.length - indexOfFirstData - index
                              : indexOfFirstData + index + 1}
                          </a>
                        </th>
                        <td id="player_country">
                          {player.player_id == null ? (
                            <></>
                          ) : (
                            <>
                              <ReactCountryFlag
                                countryCode={player.player_id.substring(0, 2)}
                                style={{
                                  filter: "drop-shadow(0 0 0.12rem black)",
                                }}
                                svg
                              />
                              <span id="country_code">
                                {"\xa0\xa0\xa0"}
                                {player.player_id.substring(0, 2)}
                              </span>
                            </>
                          )}
                        </td>
                        <td className="text-start" id="player_name">
                          {toTitleCase(player.player_name)}
                          {"\xa0\xa0"}
                          {player.last_match == null ? (
                            <></>
                          ) : computeStatus(player.last_match) === "RET" ? (
                            <>
                              <span
                                title="Retired"
                                style={{ backgroundColor: "#000000" }}
                                className="table-retired-label"
                              >
                                {computeStatus(player.last_match)}
                              </span>
                            </>
                          ) : computeStatus(player.last_match) === "INACT" ? (
                            <>
                              <span
                                title="Inactive"
                                style={{ backgroundColor: "#808080" }}
                                className="table-retired-label"
                              >
                                {computeStatus(player.last_match)}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td id="atp_rating">
                          {player.atp_rating != null &&
                          computeStatus(player.last_match) != "RET" ? (
                            <>
                              <span
                                style={{ backgroundColor: "#808080" }}
                                className="table-surface-elo-label"
                              >
                                {player.atp_rating}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td id="atp_peak_rating">
                          <b>{player.atp_peak_rating}</b>
                          {player.atp_peak_rating_date == null ||
                          player.atp_peak_rating == null
                            ? "\xa0"
                            : " (" +
                              parseDate(
                                player.atp_peak_rating_date.split(" ")[0]
                              ) +
                              ")"}
                        </td>
                        <td id="overall_rating">
                          {player.overall_rating != null ? (
                            <>
                              <span
                                style={{ backgroundColor: "#000000" }}
                                className="table-surface-elo-label"
                              >
                                {player.overall_rating}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td id="overall_peak_rating">
                          <b>{player.overall_peak_rating}</b>
                          {player.overall_peak_rating_date == null
                            ? "\xa0"
                            : " (" +
                              parseDate(
                                player.overall_peak_rating_date.split(" ")[0]
                              ) +
                              ")"}
                        </td>
                        <td id="hard_rating">
                          {player.hard_rating != null ? (
                            <>
                              <span
                                style={{ backgroundColor: "#015778" }}
                                className="table-surface-elo-label"
                              >
                                {player.hard_rating}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td id="hard_peak_rating">
                          <b>{player.hard_peak_rating}</b>
                          {player.hard_peak_rating_date == null
                            ? "\xa0"
                            : " (" +
                              parseDate(
                                player.hard_peak_rating_date.split(" ")[0]
                              ) +
                              ")"}
                        </td>
                        <td id="clay_rating">
                          {player.clay_rating != null ? (
                            <>
                              <span
                                style={{ backgroundColor: "#E96513" }}
                                className="table-surface-elo-label"
                              >
                                {player.clay_rating}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td id="clay_peak_rating">
                          <b>{player.clay_peak_rating}</b>
                          {player.clay_peak_rating_date == null
                            ? "\xa0"
                            : " (" +
                              parseDate(
                                player.clay_peak_rating_date.split(" ")[0]
                              ) +
                              ")"}
                        </td>
                        <td id="grass_rating">
                          {player.grass_rating != null ? (
                            <>
                              <span
                                style={{ backgroundColor: "#3EBA7C" }}
                                className="table-surface-elo-label"
                              >
                                {player.grass_rating}
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td className="table-120px" id="grass_peak_rating">
                          <b>{player.grass_peak_rating}</b>
                          {player.grass_peak_rating_date == null
                            ? "\xa0"
                            : " (" +
                              parseDate(
                                player.grass_peak_rating_date.split(" ")[0]
                              ) +
                              ")"}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <h3>You have not set any players</h3>
                )}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
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
        </div>
      </div>
    </div>
  );
}

export default Players;
