import React from "react";

import zoomPlugin from "chartjs-plugin-zoom";

import { drawChart } from "../../../features/api/apiSlice";
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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
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
//======================================================================

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
          record.doc_date.toString().substring(0, 4),
          record.doc_date.toString().substring(4, 6),
          record.doc_date.toString().substring(6, 8)
        );

        var X = doc_X.toLocaleDateString("en-CA");

        if (
          filter === "elo ratings by age" ||
          filter === "elo rankings by age"
        ) {
          const dob = new Date(
            player_details.birthdate.substring(0, 4),
            player_details.birthdate.substring(4, 6),
            player_details.birthdate.substring(6, 8)
          );
          //Subtract birthdate by doc_date
          X = calculate_age(dob, doc_X);
        }

        if (filter === "elo ratings" || filter === "elo ratings by age") {
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
          filter === "elo rankings" ||
          filter === "elo rankings by age"
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

export default function () {
  const { charts, api_isLoading } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  //Data
  const [data, setData] = useState([]);
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
    dispatch(drawChart("AT0002,AT0003"));
  }, [filter]);

  if (overall_data.length === 0 && data.length !== 0) {
    pushToDatasets(data, charts.player, filter.toLowerCase());
  }

  //If loading
  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  if (data.length === 0 || api_isLoading) {
    return (
      <>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <main className="col bg-white rounded-3">
              <div className="row gx-4">
                <div className="col-md shadow">
                  <div className="m-2 my-4">
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
                        datasets: [],
                      }}
                      width={"500px"}
                      height={"700em"}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container-fluid h-100">
        <div className="row h-100">
          <main className="col bg-white rounded-3">
            <div className="row gx-4">
              <div className="col-md shadow">
                <div className="m-2 my-4">
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
                      datasets: [],
                    }}
                    width={"500px"}
                    height={"700em"}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
