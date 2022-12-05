import bg_img from "../img/bg-charts2.png";
import Dropdown from "react-bootstrap/Dropdown";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { loadTournaments } from "../../features/api/apiSlice";
import { useEffect, useState } from "react";

function parseDate(dateString) {
  if (dateString == null) {
    return null;
  }

  return `${dateString.toString().slice(0, 4)}-${dateString
    .toString()
    .slice(4, 6)}-${dateString.toString().slice(6, 8)}`;
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

export default function Tournaments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tournaments, api_isLoading } = useSelector((state) => state.api);

  const [data, setData] = useState([]);
  //get current year as string
  const currentYear = new Date().getFullYear().toString();
  const [year, setYear] = useState(currentYear);
  const [order, setOrder] = useState("DSC");
  const [column, setColumn] = useState("");

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
    dispatch(loadTournaments());
  }, []);

  useEffect(() => {
    if (tournaments != null) {
      //filter tournaments by year
      const filteredTournaments = tournaments?.tournaments?.filter(
        (tournament) => tournament.tourney_date.toString().slice(0, 4) === year
      );
      setData(filteredTournaments?.sort(alphabetically(false, "tourney_date")));
    }
  }, [tournaments]);

  useEffect(() => {
    //filter tournaments by year and sort ascending
    if (tournaments != null) {
      const filteredTournaments = tournaments?.tournaments?.filter(
        (tournament) => tournament.tourney_date.toString().slice(0, 4) === year
      );
      setData(filteredTournaments?.sort(alphabetically(false, "tourney_date")));
    }
  }, [year]);

  console.log(data);

  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  if (api_isLoading || data == null || data.length === 0) {
    return <ClipLoader cssOverride={override} size={70} />;
  }
  return (
    <div className="charts-bg" style={{ backgroundImage: `url(${bg_img})` }}>
      <div className="px-4 py-4">
        <div className="row">
          <div className="ms-2">
            <h1 className="fw-bold fs-4">Tournaments Archives</h1>
            <p>
              Welcome to tournaments archives! Search for your favorite
              tournament here.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mx-5">
            <div className="input-group">
              <Dropdown className="border border-dark dropdown rounded-3 mr-5 bg-white">
                <Dropdown.Toggle
                  className="o40"
                  variant="white"
                  id="dropdown-basic"
                  size="sm"
                >
                  {year}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ height: 300, overflowY: "scroll" }}>
                  {tournaments.tournaments
                    .map((tournament) =>
                      tournament.tourney_date.toString().slice(0, 4)
                    )
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    )
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <Dropdown.Item
                        key={year}
                        onClick={() => setYear(year)}
                        href="#"
                      >
                        {year}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          {/* Generate Table where background is white and gray on hover*/}

          <div
            className="col-xl-12 col-sm-12 px-5 mt-4"
            style={{ justifySelf: "center" }}
          >
            <table className="table liverating-table-bg-white ">
              <thead>
                <tr className="text-center">
                  <th onClick={() => sorting("tourney_date")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Date
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "tourney_date" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "tourney_date" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th
                    onClick={() => sorting("tourney_name")}
                    scope="col"
                    className="text-start"
                  >
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Tournament
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "tourney_name" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "tourney_name" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th onClick={() => sorting("surface")} scope="col">
                    <a href="#/" style={{ color: "inherit", fontWeight: 700 }}>
                      Surface
                      {"\xa0"}
                      {"\xa0"}
                      {"\xa0"}
                      {column === "surface" && order === "ASC" ? (
                        <CaretDownFill />
                      ) : column === "surface" && order === "DSC" ? (
                        <CaretUpFill />
                      ) : (
                        <></>
                      )}
                    </a>
                  </th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody>
                {data.map((tournament) => (
                  <tr
                    className="align-middle text-center"
                    key={tournament.tourney_id}
                  >
                    <td>{parseDate(tournament.tourney_date)}</td>
                    <td className="text-start">
                      <b>{tournament.tourney_name}</b>
                    </td>
                    <td>
                      <span
                        style={
                          tournament.surface === "Grass"
                            ? { backgroundColor: "#3EBA7C" }
                            : tournament.surface === "Hard" ||
                              tournament.surface === "Carpet"
                            ? { backgroundColor: "#015778" }
                            : tournament.surface === "Clay"
                            ? { backgroundColor: "#E96513" }
                            : { backgroundColor: "#000000" }
                        }
                        className="table-surface-elo-label w-50 px-2 py-1"
                      >
                        {tournament.surface === "Carpet"
                          ? "Hard"
                          : tournament.surface == null
                          ? "Unknown"
                          : tournament.surface}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-block btn-outline-dark px-2 py-1"
                        style={{ fontSize: 14, fontWeight: 600 }}
                        onClick={() => {
                          navigate(`/tournaments/${tournament.tourney_id}`);
                        }}
                      >
                        RESULTS
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
