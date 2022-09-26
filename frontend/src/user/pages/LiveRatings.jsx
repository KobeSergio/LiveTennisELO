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
import {
  loadPlayerList,
  loadRecord,
  resetRecords,
} from "../../features/api/apiSlice";

import Dropdown from "react-bootstrap/Dropdown";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
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

  useEffect(() => {
    setData([...records]);
  }, [record, api_isLoading]);
  const recordIndex = choicesCopy.findIndex((x) => x == record);
  const [data, setData] = useState([...records]);
  const [DataPerPage, setDataPerPage] = useState(20); 
  const onSearch = (e) => {
    if (e.target.value != "") { 
      if (e.target.value.length == 2) {
        setData(
          records.filter((o) =>
            Object.keys(o).some((k) =>
              String(o[k])
                .toLowerCase()
                .includes(e.target.value.toLowerCase() + "0")
            )
          )
        );
      } else {
        setData(
          records.filter((o) =>
            Object.keys(o).some((k) =>
              String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
            )
          )
        );
      }
    } else { 
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
                  <Dropdown className="rounded-3 border border-dark ">
                    <Dropdown.Toggle
                      className="o40"
                      variant="white"
                      id="dropdown-basic"
                      size="sm"
                    >
                      {year}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ height: 300, overflowY: "scroll" }}>
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
                        dispatch(resetRecords());
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
                <Dropdown className="rounded-3 border border-dark ">
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
                  <Dropdown.Menu style={{ height: 300, overflowY: "scroll" }}>
                    {choicesCopy.map((choice) =>
                      Math.floor(choice / 10000) === year ? (
                        <Dropdown.Item
                          onClick={() => {
                            dispatch(resetRecords());
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
                        dispatch(resetRecords());
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
            <div className="col-xl-4 col-sm-12">
              <div className="input-group">
                <input
                  className="form-control   border border-dark "
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
              <p className="mb-3 p-0" style={{ color: "gray", fontSize: 14 }}>
                {"\xa0\xa0\xa0\xa0\xa0"}For searching by country, please
                indicate the country code only.{" "}
              </p>
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
