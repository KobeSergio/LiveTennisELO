import React from "react";
import { Download, Search, TrashFill } from "react-bootstrap-icons";
import ReactCountryFlag from "react-country-flag";
import Pagination from "../components/Pagination";
import { SurfaceLegend } from "../components/Legend";

//Backend
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadPlayers } from "../../features/players/playersSlice";
import { resetPlayer } from "../../features/players/playerSlice";
import ClipLoader from "react-spinners/ClipLoader";
import Dropdown from "react-bootstrap/Dropdown";

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

function Players() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Redirect if not logged in
  const { user } = useSelector((state) => state.auth);
  const { players_message, players, players_isLoading } = useSelector(
    (state) => state.players
  );

  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    setData(players);
  }, [players]);

  const onSearch = (e) => {
    setCurrentPage(1);
    if (e.target.value != "") {
      setData(
        data.filter((o) =>
          Object.keys(o).some((k) =>
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      );
    } else {
      setData([...players]);
    }
  };

  const sorting = (col) => {
    if (order === "ASC") {
      var sorted = null;
      if (col === "player_id" || col === "name") {
        sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      } else {
        sorted = [...data].sort(alphabetically(true, col));
      }
      setData(sorted);
      setOrder("DSC");
    } else if (order === "DSC") {
      var sorted = null;
      if (col === "player_id" || col === "name") {
        sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      } else {
        sorted = [...data].sort(alphabetically(false, col));
      }
      setData(sorted);
      setOrder("ASC");
    }
  };

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

  useEffect(() => {
    dispatch(resetPlayer());
    if (!user) {
      navigate("/admin-login");
    }
    dispatch(loadPlayers());
  }, [user, navigate]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [DataPerPage, setDataPerPage] = useState(100);

  //Get index of the last Data
  const indexOfLastData = currentPage * DataPerPage;
  const indexOfFirstData = indexOfLastData - DataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  if (data.length == 0 || players_isLoading) {
    return <ClipLoader cssOverride={override} size={70} />;
  }

  return (
    <>
      <div>
        <h1 className="fw-bold fs-4">Player's Data</h1>
      </div>

      {/* main search + filters */}
      <div className="input-group pt-3 pb-3 mx-3 ">
        <div className="input-group" style={{ width: "30%" }}>
          <input
            className="form-control border-0 dropdown rounded-3"
            type="text"
            placeholder="Search Player"
            aria-label="Search Player"
            onChange={onSearch}
          />
          <span className="input-group-button">
            <button
              className="btn btn-green search-btn px-3 py-1"
              type="submit"
            >
              <Search color="white" className="fs-7" />
            </button>
          </span>
        </div>
        <div className="ms-auto me-5">
          <Dropdown className="border-0 dropdown rounded-3">
            <Dropdown.Toggle
              className="o40"
              variant="white"
              id="dropdown-basic"
              size="sm"
            >
              {DataPerPage} per page
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setDataPerPage(100)} href="#">
                100 per page
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDataPerPage(250)} href="#">
                250 per page
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDataPerPage(500)} href="#">
                500 per page
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setDataPerPage(data.length)}
                href="#"
              >
                All
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* utilities */}
      <div className="input-group py-2">
        <div className="ms-auto d-flex align-items-start">
          <SurfaceLegend />
        </div>
      </div>

      {/* tables */}
      <div className="input-group px-2">
        <table className="table table-borderless text-center">
          <thead>
            <tr>
              <th onClick={() => sorting("player_id")} scope="col">
                ID
              </th>
              <th scope="col">Country</th>
              <th
                onClick={() => sorting("player_name")}
                scope="col"
                style={{ textAlign: "left" }}
              >
                Name
              </th>
              <th onClick={() => sorting("atp_rating")} scope="col">
                ATP
              </th>
              <th onClick={() => sorting("overall_rating")} scope="col">
                Overall
              </th>
              <th onClick={() => sorting("overall_peak_rating")} scope="col">
                Overall Peak
              </th>
              <th onClick={() => sorting("hard_rating")} scope="col">
                Hard
              </th>
              <th
                onClick={() => sorting("hard_peak_rating")}
                className="text-start"
                scope="col"
              >
                Hard Peak
              </th>
              <th onClick={() => sorting("clay_rating")} scope="col">
                Clay
              </th>
              <th
                onClick={() => sorting("clay_peak_rating")}
                className="text-start"
                scope="col"
              >
                Clay Peak
              </th>
              <th onClick={() => sorting("grass_rating")} scope="col">
                Grass
              </th>
              <th
                onClick={() => sorting("grass_peak_rating")}
                className="text-start"
                scope="col"
              >
                Grass Peak
              </th>
            </tr>
          </thead>
          <tbody className="tbody">
            {currentData != null ? (
              <>
                {currentData.map((player) => (
                  <tr onClick={() => navigate(player.player_id)}>
                    <td scope="row">{player.player_id}</td>
                    <td className="table-40px" scope="row">
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
                        </>
                      )}
                    </td>
                    <td className="text-start" id="player_name">
                      {toTitleCase(player.player_name)}
                    </td>
                    <td className="table-40px" id="atp_rating">
                      {player.atp_rating}
                    </td>
                    <td className="table-40px" id="overall_rating">
                      {player.overall_rating}
                    </td>
                    <td className=" " id="overall_peak_rating">
                      {player.overall_peak_rating}
                      {player.overall_peak_rating_date == null
                        ? "\xa0"
                        : " (" +
                          player.overall_peak_rating_date.split(" ")[0] +
                          ")"}
                    </td>
                    <td className="table-40px" id="hard_rating">
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
                    <td className="table-120px" id="hard_peak_rating">
                      {player.hard_peak_rating}
                      {player.hard_peak_rating_date == null
                        ? "\xa0"
                        : " (" +
                          player.hard_peak_rating_date.split(" ")[0] +
                          ")"}
                    </td>
                    <td className=" table-40px" id="clay_rating">
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
                    <td className="table-120px" id="clay_peak_rating">
                      {player.clay_peak_rating}
                      {player.clay_peak_rating_date == null
                        ? "\xa0"
                        : " (" +
                          player.clay_peak_rating_date.split(" ")[0] +
                          ")"}
                    </td>
                    <td className=" table-40px" id="grass_rating">
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
                      {player.grass_peak_rating}
                      {player.grass_peak_rating_date == null
                        ? "\xa0"
                        : " (" +
                          player.grass_peak_rating_date.split(" ")[0] +
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
        <div className="ms-auto">
          <Pagination
            DataPerPage={DataPerPage}
            totalData={data.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}

export default Players;
