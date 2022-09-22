import { ChevronLeft, ChevronRight, Search } from "react-bootstrap-icons";
import bg_img from "../img/bg-liveratings.png";
import LiveRatingsTable from "../components/Tables/LiveRatingsTable";
import SideTables from "../components/Tables/SideTables";
import Footer from "../components/Footer/Footer";
import SearchCountry from "../components/Search/SearchCountry";
import ShowInactive from "../components/Toggle/ShowInactive";
import SearchRecords from "../components/Search/SearchRecords";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadRecord } from "../../features/api/apiSlice";

import Dropdown from "react-bootstrap/Dropdown";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
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
export default function Charts() {
  const dispatch = useDispatch();

  const { latest, choices, api_isLoading, records } = useSelector(
    (state) => state.api
  );
  var choicesCopy = [...choices].reverse();
  var years = [];
  choicesCopy.forEach((choice) => years.push(Math.floor(choice / 10000)));
  years = years.filter(onlyUnique);
  const [year, setyear] = useState(years[0]);
  const [record, setRecord] = useState(choicesCopy[0]);
  useEffect(() => {
    if (years.length != 0) {
      setyear(years[0]);
    }
    if (choicesCopy.length != 0) {
      setRecord(choicesCopy[0]);
    }
  }, [latest]);
  const recordIndex = choicesCopy.findIndex((x) => x == record);

  const [data, setData] = useState([...records]);
  const [DataPerPage, setDataPerPage] = useState(20);
  const [len, setLen] = useState(0);
  const onSearch = (e) => {
    if (e.target.value != "") {
      setLen(e.target.value.length);
      setData(
        records.filter((o) =>
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

  return (
    <>
      <div
        className="liverating-bg"
        style={{ backgroundImage: `url(${bg_img})` }}
      >
        <div className="px-3 py-4">
          <div className="p-2 col-6-lg ">
            <h1 className="fs-3">
              <b>Welcome to TenELOs - Live Tennis ELO Ratings!</b>
            </h1>
            <p>
              Your go-to place for men's professional tennis statistics! Track
              your favorite player's ratings with the help of graphs and compare
              them to their rivals.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-12 col-xl-4">
              <div className="input-group">
                <div className="me-2">
                  <Dropdown className="rounded-3">
                    <Dropdown.Toggle
                      className="o40"
                      variant="white"
                      id="dropdown-basic"
                      size="sm"
                    >
                      {year}
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      style={{height: 300, overflowY: "scroll" }}
                    >
                      {years.map((year) => (
                        <Dropdown.Item onClick={() => setyear(year)} href="#/">
                          {year}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <span className="input-group-button">
                  <a
                    onClick={() => {
                      if (recordIndex != choicesCopy.length) {
                        dispatch(loadRecord(choicesCopy[recordIndex + 1]));
                        setRecord(choicesCopy[recordIndex + 1]);
                        setDataPerPage(20);
                      } else {
                        console.log("REACHED END OF RECORDS");
                      }
                    }}
                    href="#/"
                  >
                    <button className="btn border-0 dropdown rounded-3 me-1">
                      <ChevronLeft color="gray" style={{ fontSize: "18px" }} />
                    </button>
                  </a>
                </span>
                <Dropdown className="rounded-3">
                  <Dropdown.Toggle
                    className="o40"
                    variant="white"
                    id="dropdown-basic"
                    size="sm"
                  >
                    {Math.floor(record / 10000).toString() +
                      "/" +
                      Math.floor((record % 10000) / 100).toString() +
                      "/" +
                      Math.floor(((record % 10000) % 100) / 1).toString()}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{height: 300, overflowY: "scroll" }}>
                    {choicesCopy.map((choice) =>
                      Math.floor(choice / 10000) === year ? (
                        <Dropdown.Item
                          onClick={() => {
                            dispatch(loadRecord(choice));
                            setRecord(choice);
                            setDataPerPage(20);
                          }}
                          href="#/"
                        >
                          {Math.floor(choice / 10000).toString() +
                            "/" +
                            Math.floor((choice % 10000) / 100).toString() +
                            "/" +
                            Math.floor(((choice % 10000) % 100) / 1).toString()}
                        </Dropdown.Item>
                      ) : (
                        console.log()
                      )
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                <span className="input-group-button">
                  <a
                    onClick={() => {
                      if (recordIndex != 0) {
                        dispatch(loadRecord(choicesCopy[recordIndex - 1]));
                        setRecord(choicesCopy[recordIndex - 1]);
                        setDataPerPage(20);
                      } else {
                        console.log("REACHED END OF RECORDS");
                      }
                    }}
                    href="#/"
                  >
                    <button className="btn dropdown rounded-3 ms-1">
                      <ChevronRight color="gray" style={{ fontSize: "18px" }} />
                    </button>
                  </a>
                </span>
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
                    <Dropdown.Item onClick={() => setDataPerPage(20)} href="#">
                      20 per page
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setDataPerPage(50)} href="#">
                      50 per page
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setDataPerPage(100)} href="#">
                      100 per page
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setDataPerPage(records.length)}
                      href="#"
                    >
                      All
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {/* SEARCH IN RECORD */}
            <div className="col-xl-4 col-sm-12 my-2">
              <div className="input-group">
                <input
                  className="form-control border-0 dropdown rounded-3"
                  type="text"
                  placeholder="Search in Record"
                  aria-label="Search in Record"
                  onChange={onSearch}
                />
                <span className="input-group-button">
                  <button
                    className="btn btn-black search-btn px-3 py-1"
                    type="submit"
                  >
                    <Search color="white" className="fs-7" />
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <LiveRatingsTable data={data} dataPerPage={DataPerPage} />
            <SideTables />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
