import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../css/admin/colors.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  zoomPlugin,
  Title,
  Tooltip,
  Legend
);

var overall_data = [];
var hard_data = [];
var grass_data = [];
var clay_data = [];
var atp_data = [];

function calculate_age(dob, currDate) {
  var diff_ms = currDate.getTime() - dob.getTime();

  return Math.abs(diff_ms / (365 * 86400000));
}

function pushToDatasets(player_records, player_details, filter) {
  //Doc date or Age = x
  //Ranking or rating = y

  var chartData = [...player_records];
  var tempCtr = 0;
  var tempStorage = "";
  chartData
    .sort((a, b) =>
      a.doc_date < b.doc_date ? -1 : b.doc_date > a.doc_date ? 1 : 0
    )
    .forEach((record) => {
      //Lessen long lines
      if (record.ranking === tempStorage) {
        tempCtr++;
      } else {
        tempStorage = record.ranking;
        tempCtr = 0;
      }

      if (tempCtr < 52) {
        var doc_X = new Date(
          record.doc_date.substring(0, 4),
          record.doc_date.substring(4, 6),
          record.doc_date.substring(6, 8)
        );

        var X = doc_X.toLocaleDateString("en-CA");

        if (filter == "elo ratings by age" || filter == "elo rankings by age") {
          const dob = new Date(
            player_details.birthdate.substring(0, 4),
            player_details.birthdate.substring(4, 6),
            player_details.birthdate.substring(6, 8)
          );
          //Subtract birthdate by doc_date
          X = calculate_age(dob, doc_X);
        }

        if (filter == "elo ratings" || filter == "elo ratings by age") {
          overall_data.push({
            x: X,
            y: record.ranking,
          });
          clay_data.push({
            x: X,
            y: record.clay,
          });
          grass_data.push({
            x: X,
            y: record.grass,
          });
          hard_data.push({
            x: X,
            y: record.hard,
          });
          atp_data.push({
            x: X,
            y: record.atp,
          });
        } else if (
          filter == "elo rankings" ||
          filter == "elo rankings by age"
        ) {
          overall_data.push({
            x: X,
            y: record.overall_rank,
          });
          clay_data.push({
            x: X,
            y: record.clay_rank,
          });
          grass_data.push({
            x: X,
            y: record.grass_rank,
          });
          hard_data.push({
            x: X,
            y: record.hard_rank,
          });
          atp_data.push({
            x: X,
            y: record.atp_rank,
          });
        }
      }
    });
}

export function PlayerCharts() {
  const { player_records, player_details } = useSelector(
    (state) => state.player
  );

  //Modal popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Data
  const [data, setData] = useState([...player_records]);
  const [filter, setFilter] = useState("ELO Ratings");
  const [invert, setInvert] = useState(false);
  const [type, setType] = useState("time");

  //Empty data on load to be pushed below.
  useEffect(() => {
    overall_data = [];
    hard_data = [];
    grass_data = [];
    clay_data = [];
    atp_data = [];
  }, [filter]);

  if (overall_data.length == 0) {
    pushToDatasets(data, player_details[0], filter.toLowerCase());
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton className="px-4 py-3">
          <Modal.Title className="gc-100">
            <span className="gc-100" id="playername">
              {player_details[0].player_name}
            </span>
            's {filter}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row px-2 rounded">
            <div className="row">
              <div className="input-group">
                {/* <div className="me-4">
                  Rank Type: <ELORating />
                </div> */}
                {/* <div className="ms-auto me-5 mt-2">
                  <a className="o60 fs-5" href="#">
                    <Download className="me-2 mb-1" />
                    Export
                  </a>
                </div> */}
                <Dropdown className="border-0 dropdown mx-2 rounded-3">
                  <Dropdown.Toggle
                    variant="white"
                    id="dropdown-basic"
                    size="lg"
                  >
                    {filter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setFilter("ELO Ratings");
                        setInvert(false);
                        setType("time");
                      }}
                      href="#/"
                    >
                      ELO Ratings
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setFilter("ELO Rankings");
                        setInvert(true);
                        setType("time");
                      }}
                      href="#/"
                    >
                      ELO Rankings
                    </Dropdown.Item>
                    <Dropdown.Item
                      disabled={
                        player_details[0].birthdate == null ? true : null
                      }
                      onClick={() => {
                        setFilter("ELO Ratings by Age");
                        setInvert(false);
                        setType("linear");
                      }}
                      href="#/"
                    >
                      ELO Ratings by Age
                    </Dropdown.Item>
                    <Dropdown.Item
                      disabled={
                        player_details[0].birthdate == null ? true : null
                      }
                      onClick={() => {
                        setFilter("ELO Rankings by Age");
                        setInvert(true);
                        setType("linear");
                      }}
                      href="#/"
                    >
                      ELO Rankings by Age
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="row mt-3">
              <div>
                <Line
                  options={{
                    scales: {
                      xAxes: {
                        type: type,
                        time: {
                          unit: "year",
                          tooltipFormat: "YYYY-MM-DD",
                        },
                      },
                      yAxes: {
                        position: "right",
                        reverse: invert,
                      },
                    },
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: false,
                      },
                      zoom: {
                        zoom: {
                          drag: {
                            enabled: true,
                          },
                          wheel: {
                            enabled: true,
                          },
                        },
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                  data={{
                    datasets: [
                      {
                        label: "Overall",
                        data: overall_data,
                        borderColor: "black",
                        backgroundColor: "black",
                        borderWidth: 2,
                        pointBorderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                      },
                      {
                        label: "Hard",
                        data: hard_data,
                        borderColor: "#015778",
                        backgroundColor: "#015778",
                        borderWidth: 2,
                        pointBorderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                      },
                      {
                        label: "Clay",
                        data: clay_data,
                        borderColor: "#E96513",
                        backgroundColor: "#E96513",
                        borderWidth: 2,
                        pointBorderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                      },
                      {
                        label: "Grass",
                        data: grass_data,
                        borderColor: "#339966",
                        backgroundColor: "#339966",
                        borderWidth: 2,
                        pointBorderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                      },
                    ],
                  }}
                  width={"1000px"}
                  height={"500px"}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="ms-0 mb-3">
        <div className="row">
          <div className="card bg-white col me-2 shadow rounded mb-2">
            <h1 className="mt-2 fs-4">Overall {filter}</h1>
            <h2 className="fs-5">
              From:{" "}
              <span id="years">
                {overall_data[0] != null ? (
                  <>
                    {filter.toLowerCase() == "elo ratings by age" ||
                    filter.toLowerCase() == "elo rankings by age" ? (
                      <>
                        {Math.floor(overall_data[0].x)} -{" "}
                        {Math.floor(overall_data[overall_data.length - 1].x)} years
                      </>
                    ) : (
                      <>
                        {overall_data[0].x.length > 2 ? (
                          <>
                            {overall_data[0].x.substring(0, 4)} -{" "}
                            {overall_data[overall_data.length - 1].x.substring(
                              0,
                              4
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </span>
            </h2>
            <div>
              <Line
                onClick={handleShow}
                options={{
                  scales: {
                    xAxes: {
                      type: type,
                      time: {
                        unit: "year",
                        tooltipFormat: "YYYY-MM-DD",
                      },
                    },
                    yAxes: {
                      position: "right",
                      reverse: invert,
                    },
                  },
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                }}
                data={{
                  datasets: [
                    {
                      data: overall_data,
                      borderColor: "black",
                      backgroundColor: "black",
                      borderWidth: 2,
                      pointBorderWidth: 2,
                      pointRadius: 0,
                      pointHoverRadius: 5,
                    },
                  ],
                }}
                height={"500px"}
              />
            </div>
          </div>
          <div className="card bg-white col me-2 shadow rounded mb-2">
            <h1 className="mt-2 fs-4">Clay {filter}</h1>
            <h2 className="fs-5">
              From:{" "}
              <span id="years">
                {clay_data[0] != null ? (
                  <>
                    {filter.toLowerCase() == "elo ratings by age" ||
                    filter.toLowerCase() == "elo rankings by age" ? (
                      <>
                        {Math.floor(clay_data[0].x)} - {Math.floor(clay_data[clay_data.length - 1].x)}{" "}
                        years
                      </>
                    ) : (
                      <>
                        {clay_data[0].x.length > 2 ? (
                          <>
                            {clay_data[0].x.substring(0, 4)} -{" "}
                            {clay_data[clay_data.length - 1].x.substring(0, 4)}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </span>
            </h2>
            <div>
              <Line
                onClick={handleShow}
                options={{
                  scales: {
                    xAxes: {
                      type: type,
                      time: {
                        unit: "year",
                        tooltipFormat: "YYYY-MM-DD",
                      },
                    },
                    yAxes: {
                      position: "right",
                      reverse: invert,
                    },
                  },
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                }}
                data={{
                  datasets: [
                    {
                      data: clay_data,
                      borderColor: "#E96513",
                      backgroundColor: "#E96513",
                      borderWidth: 2,
                      pointBorderWidth: 2,
                      pointRadius: 0,
                      pointHoverRadius: 5,
                    },
                  ],
                }}
                height={"500px"}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card bg-white col me-2 shadow rounded mb-2">
            <h1 className="mt-2 fs-4 hard-text">Hard {filter}</h1>
            <h2 className="fs-5">
              From:{" "}
              <span id="years">
                {hard_data[0] != null ? (
                  <>
                    {filter.toLowerCase() == "elo ratings by age" ||
                    filter.toLowerCase() == "elo rankings by age" ? (
                      <>
                        {Math.floor(hard_data[0].x)} - {Math.floor(hard_data[hard_data.length - 1].x)}{" "}
                        years
                      </>
                    ) : (
                      <>
                        {hard_data[0].x.length > 2 ? (
                          <>
                            {hard_data[0].x.substring(0, 4)} -{" "}
                            {hard_data[hard_data.length - 1].x.substring(0, 4)}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </span>
            </h2>
            <div>
              <Line
                onClick={handleShow}
                options={{
                  scales: {
                    xAxes: {
                      type: type,
                      time: {
                        unit: "year",
                        tooltipFormat: "YYYY-MM-DD",
                      },
                    },
                    yAxes: {
                      position: "right",
                      reverse: invert,
                    },
                  },
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                }}
                data={{
                  datasets: [
                    {
                      data: hard_data,
                      borderColor: "#015778",
                      backgroundColor: "#015778",
                      borderWidth: 2,
                      pointBorderWidth: 2,
                      pointRadius: 0,
                      pointHoverRadius: 5,
                    },
                  ],
                }}
                height={"500px"}
              />
            </div>
          </div>
          <div className="card bg-white col shadow rounded mb-2">
            <h1 className="mt-2 fs-4 grass-text">Grass {filter}</h1>
            <h2 className="fs-5">
              From:{" "}
              <span id="years">
                {grass_data[0] != null ? (
                  <>
                    {filter.toLowerCase() == "elo ratings by age" ||
                    filter.toLowerCase() == "elo rankings by age" ? (
                      <>
                        {Math.floor(grass_data[0].x)} -{" "}
                        {Math.floor(grass_data[grass_data.length - 1].x)} years
                      </>
                    ) : (
                      <>
                        {grass_data[0].x.length > 2 ? (
                          <>
                            {grass_data[0].x.substring(0, 4)} -{" "}
                            {grass_data[grass_data.length - 1].x.substring(
                              0,
                              4
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </span>
            </h2>
            <div>
              <Line
                onClick={handleShow}
                options={{
                  scales: {
                    xAxes: {
                      type: type,
                      time: {
                        unit: "year",
                        tooltipFormat: "YYYY-MM-DD",
                      },
                    },
                    yAxes: {
                      position: "right",
                      reverse: invert,
                    },
                  },
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                }}
                data={{
                  datasets: [
                    {
                      data: grass_data,
                      borderColor: "#339966",
                      backgroundColor: "#339966",
                      borderWidth: 2,
                      pointBorderWidth: 2,
                      pointRadius: 0,
                      pointHoverRadius: 5,
                    },
                  ],
                }}
                height={"500px"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
