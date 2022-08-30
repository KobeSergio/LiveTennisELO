import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import bg_img from "../img/bg-liveratings.png";
import LiveRatingsTable from "../components/Tables/LiveRatingsTable";
import SideTables from "../components/Tables/SideTables";
import Footer from "../components/Footer/Footer";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadRecord } from "../../features/api/apiSlice";

import Dropdown from "react-bootstrap/Dropdown";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default function Charts() {
  const dispatch = useDispatch();

  const { latest, choices, api_isLoading } = useSelector((state) => state.api);
  var choicesCopy = [...choices].reverse();

  var years = [];
  choicesCopy.forEach((choice) => years.push(Math.floor(choice / 10000)));
  years = years.filter(onlyUnique);

  const [year, setyear] = useState(years[0]);
  const [record, setRecord] = useState(choicesCopy[0]);

  useEffect(() => {
    console.log(years.length);
    if (years.length != 0) {
      setyear(years[0]);
    }
    if (choicesCopy.length != 0) {
      setRecord(choicesCopy[0]);
    }
  }, [latest]);

  const recordIndex = choicesCopy.findIndex((x) => x == record);
  console.log(recordIndex);
  // const recordIndex = choicesCopy.findIndex((x) => x == doc_date);
  return (
    <>
      <div
        className="liverating-bg"
        style={{ backgroundImage: `url(${bg_img})` }}
      >
        <div className="px-5 py-4">
          <div className="p-2 w-50">
            <h1 className="fs-3">
              <b>Welcome to Live Tennis ELO Ratings!</b>
            </h1>
            <p>
              Your go-to place for men's professional tennis statistics! Track
              your favorite player's ratings with the help of graphs and compare
              them to their rivals.
            </p>
          </div>
          <div className="w-50">
            <div className="input-group pt-3 pb-3">
              <div className="input-group">
                <div className="me-4">
                  <Dropdown className="border rounded-3">
                    <Dropdown.Toggle
                      className="o40"
                      variant="white"
                      id="dropdown-basic"
                      size="sm"
                    >
                      {year}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
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
                      } else {
                        console.log("REACHED END OF RECORDS");
                      }
                    }}
                    href="#/"
                  >
                    <button className="btn btn-white border-0 dropdown rounded-3 me-2">
                      <ChevronLeft color="gray" style={{ fontSize: "18px" }} />
                    </button>
                  </a>
                </span>
                <Dropdown className="border rounded-3">
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
                  <Dropdown.Menu>
                    {choicesCopy.map((choice) =>
                      Math.floor(choice / 10000) === year ? (
                        <Dropdown.Item
                          onClick={() => {
                            dispatch(loadRecord(choice));
                            setRecord(choice);
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
                      } else {
                        console.log("REACHED END OF RECORDS");
                      }
                    }}
                    href="#/"
                  >
                    <button className="btn btn-white border-0 dropdown rounded-3 me-2">
                      <ChevronRight color="gray" style={{ fontSize: "18px" }} />
                    </button>
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <LiveRatingsTable />
            <SideTables />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
