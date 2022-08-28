import SearchCountry from "../Search/SearchCountry";
import ShowInactive from "../Toggle/ShowInactive";
import SearchRecords from "../Search/SearchRecords";
import ClipLoader from "react-spinners/ClipLoader";

import Dropdown from "react-bootstrap/Dropdown";
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";
import ReactCountryFlag from "react-country-flag";
import { PositiveElo, NegativeElo } from "../Labels/ELO";
import Pagination from "../Pagination";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

function getAge(record, players) {
  var birthdatestring = "";
  for (var player in players) {
    if (record.player_id == player.player_id) {
      birthdatestring = player.birthdate;
      break;
    }
  }

  var birthdate = new Date(
    birthdatestring.substring(0, 4),
    birthdatestring.substring(4, 6),
    birthdatestring.substring(6, 8)
  );

  var docdate = new Date(
    record.doc_date.substring(0, 4),
    record.doc_date.substring(4, 6),
    record.doc_date.substring(6, 8)
  );

  var diff = birthdate.getFullYear() - docdate.getFullYear();
  return Math.abs(diff);
}

export default function () {
  const { players, records, api_isLoading } = useSelector((state) => state.api);
  //Main data
  const [data, setData] = useState(records);
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    setData([...records].sort(alphabetically(true, "overall_rank")));
  }, [api_isLoading]);

  //Search
  const [len, setLen] = useState(0);
  const onSearch = (e) => {
    if (e.target.value != "") {
      setLen(e.target.value.length);
      setData(
        data.filter((o) =>
          Object.keys(o).some((k) =>
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      );
    } else {
      setLen(e.target.value.length);
      setData([...records]);
    }
  };

  //Sorting
  const sorting = (col) => {
    if (order === "ASC") {
      var sorted = null;
      if (col === "name") {
        sorted = [...data].sort((a, b) =>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
      } else {
        sorted = [...data].sort(alphabetically(true, col));
      }
      setData(sorted);
      setOrder("DSC");
    } else if (order === "DSC") {
      var sorted = null;
      if (col === "name") {
        sorted = [...data].sort((a, b) =>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
      } else {
        sorted = [...data].sort(alphabetically(false, col));
      }
      setData(sorted);
      setOrder("ASC");
    }
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [DataPerPage, setDataPerPage] = useState(100);

  //Get index of the last Data
  const indexOfLastData = currentPage * DataPerPage;
  const indexOfFirstData = indexOfLastData - DataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //If loading
  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  if (data.length <= 1 || api_isLoading) {
    return (
      <>
        <div className="w-75">
          <div className="row">
            <div className="col-lg-12">
              <ClipLoader cssOverride={override} size={70} />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-75">
        <div className="row">
          <div className="col-lg-12">
            <nav>
              <div
                className="nav nav-tabs pb-1 border-0"
                id="nav-tab"
                role="tablist"
              >
                <a
                  className="nav-item nav-link table-tab-active"
                  id="nav-home-tab"
                  data-toggle="tab"
                  href="#nav-home"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Overall
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-profile-tab"
                  data-toggle="tab"
                  href="#nav-profile"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Hard
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-contact-tab"
                  data-toggle="tab"
                  href="#nav-contact"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  Clay
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-contact-tab"
                  data-toggle="tab"
                  href="#nav-contact"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  Grass
                </a>
                <a
                  className="nav-item nav-link me-3"
                  id="nav-contact-tab"
                  data-toggle="tab"
                  href="#nav-contact"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  ATP
                </a>
                {/* SEARCH BY COUNTRY */}
                <span className="">
                  <SearchCountry />
                </span>
                <span className="ms-4">
                  <Dropdown className="border rounded-3 ">
                    <Dropdown.Toggle
                      variant="white"
                      id="dropdown-basic"
                      size="sm"
                    >
                      10 per page
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/">15 per page</Dropdown.Item>
                      <Dropdown.Item href="#/">20 per page</Dropdown.Item>
                      <Dropdown.Item href="#/">25 per page</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
                {/* SEARCH IN RECORD */}
                <span className="ms-4">
                  <SearchRecords />
                </span>
                {/* SHOW INACTIVE */}
                <span className="ms-4 mt-2">
                  <ShowInactive />
                </span>
                <div className="ms-2 d-flex align-items-center">
                  <span>Show Inactive</span>
                </div>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active bg-white rounded"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <table
                  class="table table-borderless table-responsive liverating-table-bg-white"
                  cellSpacing="0"
                >
                  <thead>
                    <tr className="text-center">
                      <th onClick={() => sorting("overall_rank")}>Rank</th>
                      <th>
                        <ArrowUp />
                        <ArrowDown />
                      </th>
                      <th>Best Rank</th>
                      <th>Country</th>
                      <th
                        onClick={() => sorting("name")}
                        className="w-25 text-start"
                      >
                        Name
                      </th>
                      <th onClick={() => sorting("ranking")}>ELO Rating</th>
                      <th>+/-</th>
                      <th onClick={() => sorting("record_high")}>
                        Peak Elo Rating
                      </th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {data != null ? (
                      <>
                        {data.map((record) => (
                          <tr>
                            <td id="rank">{record.overall_rank}</td>
                            <td id="updown">-</td>
                            <td id="bestrank">{record.overall_peak_rank}</td>
                            <td className="" id="country">
                              <ReactCountryFlag
                                countryCode={record.player_id.substring(0, 2)}
                                style={{
                                  filter: "drop-shadow(0 0 0.12rem black)",
                                }}
                                svg
                              />
                              <span id="country_code">
                                {"\xa0\xa0\xa0"}
                                {record.player_id.substring(0, 2)}
                              </span>
                            </td>
                            <td className="text-start" id="name">
                              {record.name}
                            </td>
                            <td id="ranking">{record.ranking}</td>
                            <td id="+/-">
                              <PositiveElo />
                            </td>
                            <td id="record_high">{record.record_high}</td>
                            <td id="age"> </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <h3>You have not set any goals</h3>
                    )}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  <Pagination />
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <table class="table" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Contest Name</th>
                      <th>Date</th>
                      <th>Award Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#">Work 1</a>
                      </td>
                      <td>Doe</td>
                      <td>john@example.com</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Work 2</a>
                      </td>
                      <td>Moe</td>
                      <td>mary@example.com</td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#">Work 3</a>
                      </td>
                      <td>Dooley</td>
                      <td>july@example.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
