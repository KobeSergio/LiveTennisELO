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
import { faker } from "@faker-js/faker";
import { MatchFilter, ELORating, ELORatingTime } from "../Dropdown";
import { Download } from "react-bootstrap-icons";
import "../../../css/admin/colors.css";
import { useEffect } from "react";
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

//Options
const options = {
  scales: {
    xAxes: {
      type: "time",
      time: {
        unit: "year",
        tooltipFormat: "YYYY-MM-DD",
      },
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
};

const gen_options = {
  scales: {
    xAxes: {
      type: "time",
      time: {
        unit: "year",
        tooltipFormat: "YYYY-MM-DD",
      },
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
};

const overall_dataset = {
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
};

const hard_dataset = {
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
};
const clay_dataset = {
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
};

const grass_dataset = {
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
};

export const OverallElo = {
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
};

function pushToDatasets(player_records) {
  var chartData = [...player_records];
  chartData
    .sort((a, b) =>
      a.doc_date < b.doc_date ? -1 : b.doc_date > a.doc_date ? 1 : 0
    )
    .forEach((record) => {
      var label = new Date(
        record.doc_date.substring(0, 4),
        record.doc_date.substring(4, 6),
        record.doc_date.substring(6, 8)
      );
      overall_data.push({
        x: label.toLocaleDateString("en-CA"),
        y: record.ranking,
      });
      clay_data.push({
        x: label.toLocaleDateString("en-CA"),
        y: record.clay,
      });
      grass_data.push({
        x: label.toLocaleDateString("en-CA"),
        y: record.grass,
      });
      hard_data.push({
        x: label.toLocaleDateString("en-CA"),
        y: record.hard,
      });
    });
}

export function PlayerCharts(props) { 
  useEffect(() => {
    overall_data = [];
    hard_data = [];
    grass_data = [];
    clay_data = [];
  }, []);

  if (overall_data.length == 0) {
    pushToDatasets(props.player_records);
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="ms-0 mb-3">
        <div className="row">
          <div className="card bg-white col me-2 shadow rounded mb-2">
            <h1 className="mt-2 fs-4">Overall Rating</h1>
            <h2 className="fs-5">
              From:{" "}
              <span id="years">
                {overall_data[0].x.substring(0, 4)} -{" "}
                {overall_data[overall_data.length - 1].x.substring(0, 4)}
              </span>
            </h2>
            <div>
              <Line
                onClick={handleShow}
                options={options}
                data={overall_dataset}
                height={"500px"}
              />
            </div>
          </div>
          <div className="card bg-white col me-2 shadow rounded mb-2">
            <h1 className="mt-2 fs-4">Clay Rating</h1>
            <h2 className="fs-5">
              From:{" "}
              <span id="years">
                {clay_data[0].x.substring(0, 4)} -{" "}
                {clay_data[clay_data.length - 1].x.substring(0, 4)}
              </span>
            </h2>
            <div>
              <Line
                onClick={handleShow}
                options={options}
                data={clay_dataset}
                height={"500px"}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card bg-white col me-2 shadow rounded mb-2">
            <h1 className="mt-2 fs-4 hard-text">Hard Rating</h1>
            <h2 className="fs-5">
              From:{" "}
              <span id="years">
                {hard_data[0].x.substring(0, 4)} -{" "}
                {hard_data[hard_data.length - 1].x.substring(0, 4)}
              </span>
            </h2>
            <div>
              <Line
                onClick={handleShow}
                options={options}
                data={hard_dataset}
                height={"500px"}
              />
            </div>
          </div>
          <div className="card bg-white col shadow rounded mb-2">
            <h1 className="mt-2 fs-4 grass-text">Grass Rating</h1>
            <h2 className="fs-5">
              From:{" "}
              <span id="years">
                {grass_data[0].x.substring(0, 4)} -{" "}
                {grass_data[grass_data.length - 1].x.substring(0, 4)}
              </span>
            </h2>
            <div>
              <Line
                onClick={handleShow}
                options={options}
                data={grass_dataset}
                height={"500px"}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton className="px-4 py-3">
          <Modal.Title className="gc-100">
            <span className="gc-100" id="playername">
              {props.player.player_name}
            </span>
            's Elo Ratings
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
              </div>
            </div>
            <div className="row mt-3">
              <div>
                <Line
                  options={gen_options}
                  data={OverallElo}
                  width={"1000px"}
                  height={"500px"}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
