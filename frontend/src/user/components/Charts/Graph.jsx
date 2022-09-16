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

var p1_data = [];
var p2_data = [];

function calculate_age(dob, currDate) {
  var diff_ms = currDate.getTime() - dob.getTime();
  return Math.abs(diff_ms / (365 * 86400000));
}

function pushToDatasets(player_records, player_details, filter, surface) {
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

        if (filter === "elo ratings" || filter === "elo ratings by age") {
          if (record.player_id === player_details[0].player_id) {
            if (filter.slice(-6) === "by age") {
              const dob = new Date(
                player_details[0].birthdate.substring(0, 4),
                player_details[0].birthdate.substring(4, 6),
                player_details[0].birthdate.substring(6, 8)
              );
              //Subtract birthdate by doc_date
              X = calculate_age(dob, doc_X);
            }
            //P1 records
            p1_data.push({
              x: X,
              y:
                surface === "Overall"
                  ? record.ranking
                  : surface === "Hard"
                  ? record.hard
                  : surface === "Clay"
                  ? record.clay
                  : surface === "Grass"
                  ? record.grass
                  : record.atp,
            });
          } else {
            if (filter.slice(-6) === "by age") {
              const dob = new Date(
                player_details[1].birthdate.substring(0, 4),
                player_details[1].birthdate.substring(4, 6),
                player_details[1].birthdate.substring(6, 8)
              );
              //Subtract birthdate by doc_date
              X = calculate_age(dob, doc_X);
            }
            //p2 records
            p2_data.push({
              x: X,
              y:
                surface === "Overall"
                  ? record.ranking
                  : surface === "Hard"
                  ? record.hard
                  : surface === "Clay"
                  ? record.clay
                  : surface === "Grass"
                  ? record.grass
                  : record.atp,
            });
          }
        } else if (
          filter === "elo rankings" ||
          filter === "elo rankings by age"
        ) {
          if (record.player_id === player_details[0].player_id) {
            if (filter.slice(-6) === "by age") {
              const dob = new Date(
                player_details[0].birthdate.substring(0, 4),
                player_details[0].birthdate.substring(4, 6),
                player_details[0].birthdate.substring(6, 8)
              );
              //Subtract birthdate by doc_date
              X = calculate_age(dob, doc_X);
            }
            //P1 records
            p1_data.push({
              x: X,
              y:
                surface === "Overall"
                  ? record.overall_rank
                  : surface === "Hard"
                  ? record.hard_rank
                  : surface === "Clay"
                  ? record.clay_rank
                  : surface === "Grass"
                  ? record.grass_rank
                  : record.atp_rank,
            });
          } else {
            if (filter.slice(-6) === "by age") {
              const dob = new Date(
                player_details[1].birthdate.substring(0, 4),
                player_details[1].birthdate.substring(4, 6),
                player_details[1].birthdate.substring(6, 8)
              );
              //Subtract birthdate by doc_date
              X = calculate_age(dob, doc_X);
            }
            //p2 records
            p2_data.push({
              x: X,
              y:
                surface === "Overall"
                  ? record.overall_rank
                  : surface === "Hard"
                  ? record.hard_rank
                  : surface === "Clay"
                  ? record.clay_rank
                  : surface === "Grass"
                  ? record.grass_rank
                  : record.atp_rank,
            });
          }
        }
      }
    });
}

export default function ({ invert, filter, type, surface }) {
  const { charts, api_isLoading } = useSelector((state) => state.api);
  //Data
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  //Empty data on load to be pushed below.
  useEffect(() => {
    p1_data = [];
    p2_data = [];
    if (charts != null) {
      setData(charts.records);
    }
  }, [filter, surface, api_isLoading]);

  if (p1_data.length === 0 && p2_data.length === 0 && charts != null) {
    pushToDatasets(data, charts.players, filter.toLowerCase(), surface);
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
                      height={"600em"}
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
                        tooltip: {
                          callbacks: {
                            // We'll edit the `title` string
                            title: function (tooltipItem) {
                              // 0.079 - 0.165 : JAN
                              // 0.166 - 0.248: FEB
                              // 0.249 - 0.331 : MAR
                              // 0.332 - 0.414: APR
                              // 0.415 - 0.497 : MAY
                              // 0.498 - 0.580 : JUN
                              // 0.581 - 0.663 : JUL
                              // 0.664 - 0.746 : AUG
                              // 0.747 - 0.829: SEP
                              // 0.83 - 0.912: OCT
                              // 0.913 - 0.995: NOV
                              // 0.996 - 0.078 : DEC

                              // The following returns the full string
                              if (type === "linear") {
                                const quo = Math.floor(
                                  parseFloat(tooltipItem[0].label)
                                );
                                const rem =
                                  parseFloat(tooltipItem[0].label) % quo;

                                var ageDate = "";
                                if (rem >= 0.079 && rem <= 0.165) {
                                  ageDate = "and 1 Month";
                                } else if (rem >= 0.166 && rem <= 0.248) {
                                  ageDate = "and 2 Months";
                                } else if (rem >= 0.249 && rem <= 0.331) {
                                  ageDate = "and 3 Months";
                                } else if (rem >= 0.332 && rem <= 0.414) {
                                  ageDate = "and 4 Months";
                                } else if (rem >= 0.415 && rem <= 0.497) {
                                  ageDate = "and 5 Months";
                                } else if (rem >= 0.498 && rem <= 0.58) {
                                  ageDate = "and 6 Months";
                                } else if (rem >= 0.581 && rem <= 0.663) {
                                  ageDate = "and 7 Months";
                                } else if (rem >= 0.664 && rem <= 0.746) {
                                  ageDate = "and 8 Months";
                                } else if (rem >= 0.747 && rem <= 0.829) {
                                  ageDate = "and 9 Months";
                                } else if (rem >= 0.83 && rem <= 0.912) {
                                  ageDate = "and 10 Months";
                                } else if (rem >= 0.913 && rem <= 0.995) {
                                  ageDate = "and 11 Months";
                                }
                                return `${quo} ${ageDate}`;
                              }
                              return tooltipItem[0].label;
                            },
                          },
                        },
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
                          label: charts.players[0].player_name,
                          data: p1_data,
                          borderColor: "black",
                          backgroundColor: "black",
                          borderWidth: 2,
                          pointBorderWidth: 2,
                          pointRadius: 0,
                          pointHoverRadius: 5,
                        },
                        {
                          label: charts.players[1].player_name,
                          data: p2_data,
                          borderColor: "red",
                          backgroundColor: "red",
                          borderWidth: 2,
                          pointBorderWidth: 2,
                          pointRadius: 0,
                          pointHoverRadius: 5,
                        },
                      ],
                    }}
                    height={"600em"}
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
