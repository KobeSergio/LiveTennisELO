import ClipLoader from "react-spinners/ClipLoader";

import { loadData } from "../../../features/api/apiSlice";
import {
  CaretUpFill,
  CaretDownFill,
  SuitDiamondFill,
} from "react-bootstrap-icons";
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";
import ReactCountryFlag from "react-country-flag";
import { PositiveElo, NegativeElo } from "../Labels/ELO";
import Pagination from "../Pagination";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
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

export default function (props) {
  const { players, records, api_isLoading } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    if (records.length == 0) {
      dispatch(loadData());
    }
  }, []);

  //Main data
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");

  //Tabs
  const [toggleRecords, setToggleRecords] = useState(1);
  const [sortBy, setsortBy] = useState("overall_rank");

  useEffect(() => {
    setData([...records].sort(alphabetically(true, sortBy)));
  }, [api_isLoading]);

  useEffect(() => {
    console.log(props.data);
    if (props.data.length > 0) {
      setData(props.data);
    }
  }, [props]);

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
  const [column, setColumn] = useState("");
  const sorting = (col) => {
    setColumn(col);
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

  //If loading
  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  if (api_isLoading) {
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
                  href="#/"
                  className={
                    toggleRecords === 1
                      ? "nav-item nav-link table-tab-gray"
                      : "nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(1);
                    setData(
                      [...records].sort(alphabetically(true, "overall_rank"))
                    );
                    setsortBy("overall_rank");
                  }}
                >
                  Overall
                </a>
                <a
                  href="#/"
                  className={
                    toggleRecords === 2
                      ? "nav-item nav-link table-tab-hard"
                      : "nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(2);
                    setData(
                      [...records].sort(alphabetically(true, "hard_rank"))
                    );
                    setsortBy("hard_rank");
                  }}
                >
                  Hard
                </a>
                <a
                  href="#/"
                  className={
                    toggleRecords === 3
                      ? "nav-item nav-link table-tab-clay"
                      : "nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(3);
                    setData(
                      [...records].sort(alphabetically(true, "clay_rank"))
                    );
                    setsortBy("clay_rank");
                  }}
                >
                  Clay
                </a>
                <a
                  href="#/"
                  className={
                    toggleRecords === 4
                      ? "nav-item nav-link table-tab-active"
                      : "nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(4);
                    setData(
                      [...records].sort(alphabetically(true, "grass_rank"))
                    );
                    setsortBy("grass_rank");
                  }}
                >
                  Grass
                </a>
                <a
                  href="#/"
                  className={
                    toggleRecords === 5
                      ? "nav-item nav-link table-tab-gray"
                      : "nav-item nav-link"
                  }
                  onClick={() => {
                    setToggleRecords(5);
                    setData(
                      [...records].sort(alphabetically(true, "atp_rank"))
                    );
                    setsortBy("atp_rank");
                  }}
                >
                  ATP
                </a>
              </div>
            </nav>
            <div class="tab-content">
              <div
                class={
                  toggleRecords === 1
                    ? "tab-pane fade bg-white rounded show active"
                    : "tab-pane fade bg-white rounded"
                }
              >
                <table
                  class="table table-borderless table-responsive liverating-table-bg-white"
                  cellSpacing="0"
                >
                  <thead className="record_thead">
                    <tr className="text-center">
                      <th onClick={() => sorting("overall_rank")}>
                        <a style={{ color: "inherit" }} href="#/">
                          Rank
                        </a>
                        {"\xa0"}
                        {column === "overall_rank" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "overall_rank" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th onClick={() => sorting("overall_rank_diff")}>
                        <a style={{ color: "inherit" }} href="#/">
                          <ArrowUp />
                          <ArrowDown />
                        </a>
                        {"\xa0"}
                        {column === "overall_rank_diff" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "overall_rank_diff" &&
                          order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("overall_best_rank")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Best Rank
                        </a>
                        {"\xa0"}
                        {column === "overall_best_rank" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "overall_best_rank" &&
                          order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th className="text-center">Country</th>
                      <th
                        onClick={() => sorting("name")}
                        className="w-25 text-start"
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Name
                        </a>
                        {"\xa0"}
                        {column === "name" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "name" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("ranking")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          ELO Rating
                        </a>
                        {"\xa0"}
                        {column === "ranking" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "ranking" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("overall_rating_diff")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          +/-
                        </a>
                        {"\xa0"}
                        {column === "overall_rating_diff" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "overall_rating_diff" &&
                          order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("record_high")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Peak Rating
                        </a>
                        {"\xa0"}
                        {column === "record_high" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "record_high" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("age")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Age
                        </a>
                        {"\xa0"}
                        {column === "age" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "age" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center record_tbody">
                    {data != null ? (
                      <>
                        {data.map((record) => (
                          <tr>
                            <td id="rank">
                              {record.overall_ch == true ? (
                                <>
                                  <SuitDiamondFill
                                    size={10}
                                    color="#ffbb00"
                                    className="career-high-crown"
                                  />
                                </>
                              ) : (
                                <> </>
                              )}
                              {record.overall_rank}
                            </td>
                            <td id="updown">
                              {record.overall_rank_diff > 0 ? (
                                <PositiveElo
                                  content={record.overall_rank_diff}
                                />
                              ) : record.overall_rank_diff < 0 ? (
                                <NegativeElo
                                  content={record.overall_rank_diff}
                                />
                              ) : (
                                <>{"\xa0"}</>
                              )}
                            </td>
                            <td id="bestrank">{record.overall_best_rank}</td>
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
                            <td className="w-25 text-start" id="name">
                              <a href={`./` + record.player_id}>
                                {toTitleCase(record.name)}
                              </a>
                            </td>
                            <td id="ranking">{record.ranking}</td>
                            <td id="+/-">
                              {record.overall_rating_diff > 0 ? (
                                <PositiveElo
                                  content={record.overall_rating_diff}
                                />
                              ) : record.overall_rating_diff < 0 ? (
                                <NegativeElo
                                  content={record.overall_rating_diff}
                                />
                              ) : (
                                <>{"\xa0"}</>
                              )}
                            </td>
                            <td id="record_high">{record.record_high}</td>
                            <td id="age">{record.age}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <h3>You have not set any goals</h3>
                    )}
                  </tbody>
                </table>
              </div>
              <div
                class={
                  toggleRecords === 2
                    ? "tab-pane fade bg-white rounded show active"
                    : "tab-pane fade bg-white rounded"
                }
              >
                <table
                  class="table table-borderless table-responsive liverating-table-bg-white"
                  cellSpacing="0"
                >
                  <thead className="record_thead">
                    <tr className="text-center">
                      <th onClick={() => sorting("hard_rank")}>
                        <a style={{ color: "inherit" }} href="#/">
                          Rank
                        </a>
                        {"\xa0"}
                        {column === "hard_rank" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "hard_rank" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th onClick={() => sorting("hard_rank_diff")}>
                        <a style={{ color: "inherit" }} href="#/">
                          <ArrowUp />
                          <ArrowDown />
                        </a>
                        {"\xa0"}
                        {column === "hard_rank_diff" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "hard_rank_diff" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("hard_best_rank")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Best Rank
                        </a>
                        {"\xa0"}
                        {column === "hard_best_rank" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "hard_best_rank" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th className="text-center">Country</th>
                      <th
                        onClick={() => sorting("name")}
                        className="w-25 text-start"
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Name
                        </a>
                        {"\xa0"}
                        {column === "name" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "name" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("hard")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          ELO Rating
                        </a>
                        {"\xa0"}
                        {column === "hard" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "hard" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("hard_rating_diff")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          +/-
                        </a>
                        {"\xa0"}
                        {column === "hard_rating_diff" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "hard_rating_diff" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("hard_high")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Peak Rating
                        </a>
                        {"\xa0"}
                        {column === "hard_high" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "hard_high" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("age")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Age
                        </a>
                        {"\xa0"}
                        {column === "age" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "age" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center record_tbody">
                    {data != null ? (
                      <>
                        {data.map((record) => (
                          <tr>
                            <td id="rank">
                              {record.overall_ch == true ? (
                                <>
                                  <SuitDiamondFill
                                    size={10}
                                    color="#ffbb00"
                                    className="career-high-crown"
                                  />
                                </>
                              ) : (
                                <> </>
                              )}
                              {record.hard_rank}
                            </td>
                            <td id="updown">
                              {record.hard_rank_diff > 0 ? (
                                <PositiveElo content={record.hard_rank_diff} />
                              ) : record.hard_rank_diff < 0 ? (
                                <NegativeElo content={record.hard_rank_diff} />
                              ) : (
                                <>{"\xa0"}</>
                              )}
                            </td>
                            <td id="bestrank">{record.hard_best_rank}</td>
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
                            <td className="w-25 text-start" id="name">
                              <a href={`./` + record.player_id}>
                                {toTitleCase(record.name)}
                              </a>
                            </td>
                            <td id="ranking">{record.hard}</td>
                            <td id="+/-">
                              {record.hard_rating_diff > 0 ? (
                                <PositiveElo
                                  content={record.hard_rating_diff}
                                />
                              ) : record.hard_rating_diff < 0 ? (
                                <NegativeElo
                                  content={record.hard_rating_diff}
                                />
                              ) : (
                                <>{"\xa0"}</>
                              )}
                            </td>
                            <td id="record_high">{record.hard_high}</td>
                            <td id="age">{record.age}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <h3>You have not set any goals</h3>
                    )}
                  </tbody>
                </table>
              </div>
              <div
                class={
                  toggleRecords === 3
                    ? "tab-pane fade bg-white rounded show active"
                    : "tab-pane fade bg-white rounded"
                }
              >
                <table
                  class="table table-borderless table-responsive liverating-table-bg-white"
                  cellSpacing="0"
                >
                  <thead className="record_thead">
                    <tr className="text-center">
                      <th onClick={() => sorting("clay_rank")}>
                        <a style={{ color: "inherit" }} href="#/">
                          Rank
                        </a>
                        {"\xa0"}
                        {column === "clay_rank" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "clay_rank" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th onClick={() => sorting("clay_rank_diff")}>
                        <a style={{ color: "inherit" }} href="#/">
                          <ArrowUp />
                          <ArrowDown />
                        </a>
                        {"\xa0"}
                        {column === "clay_rank_diff" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "clay_rank_diff" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("clay_best_rank")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Best Rank
                        </a>
                        {"\xa0"}
                        {column === "clay_best_rank" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "clay_best_rank" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th className="text-center">Country</th>
                      <th
                        onClick={() => sorting("name")}
                        className="w-25 text-start"
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Name
                        </a>
                        {"\xa0"}
                        {column === "name" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "name" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("clay")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          ELO Rating
                        </a>
                        {"\xa0"}
                        {column === "clay" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "clay" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("clay_rating_diff")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          +/-
                        </a>
                        {"\xa0"}
                        {column === "clay_rating_diff" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "clay_rating_diff" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("clay_high")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Peak Rating
                        </a>
                        {"\xa0"}
                        {column === "clay_high" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "clay_high" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("age")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Age
                        </a>
                        {"\xa0"}
                        {column === "age" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "age" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center record_tbody">
                    {data != null ? (
                      <>
                        {data.map((record) => (
                          <tr>
                            <td id="rank">
                              {record.overall_ch == true ? (
                                <>
                                  <SuitDiamondFill
                                    size={10}
                                    color="#ffbb00"
                                    className="career-high-crown"
                                  />
                                </>
                              ) : (
                                <> </>
                              )}
                              {record.clay_rank}
                            </td>
                            <td id="updown">
                              {record.clay_rank_diff > 0 ? (
                                <PositiveElo content={record.clay_rank_diff} />
                              ) : record.clay_rank_diff < 0 ? (
                                <NegativeElo content={record.clay_rank_diff} />
                              ) : (
                                <>{"\xa0"}</>
                              )}
                            </td>
                            <td id="bestrank">{record.clay_best_rank}</td>
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
                            <td className="w-25 text-start" id="name">
                              <a href={`./` + record.player_id}>
                                {toTitleCase(record.name)}
                              </a>
                            </td>
                            <td id="ranking">{record.clay}</td>
                            <td id="+/-">
                              {record.clay_rating_diff > 0 ? (
                                <PositiveElo
                                  content={record.clay_rating_diff}
                                />
                              ) : record.clay_rating_diff < 0 ? (
                                <NegativeElo
                                  content={record.clay_rating_diff}
                                />
                              ) : (
                                <>{"\xa0"}</>
                              )}
                            </td>
                            <td id="record_high">{record.clay_high}</td>
                            <td id="age">{record.age}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <h3>You have not set any goals</h3>
                    )}
                  </tbody>
                </table>
              </div>
              <div
                class={
                  toggleRecords === 4
                    ? "tab-pane fade bg-white rounded show active"
                    : "tab-pane fade bg-white rounded"
                }
              >
                <table
                  class="table table-borderless table-responsive liverating-table-bg-white"
                  cellSpacing="0"
                >
                  <thead className="record_thead">
                    <tr className="text-center">
                      <th onClick={() => sorting("grass_rank")}>
                        <a style={{ color: "inherit" }} href="#/">
                          Rank
                        </a>
                        {"\xa0"}
                        {column === "grass_rank" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "grass_rank" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th onClick={() => sorting("grass_rank_diff")}>
                        <a style={{ color: "inherit" }} href="#/">
                          <ArrowUp />
                          <ArrowDown />
                        </a>
                        {"\xa0"}
                        {column === "grass_rank_diff" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "grass_rank_diff" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("grass_best_rank")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Best Rank
                        </a>
                        {"\xa0"}
                        {column === "grass_best_rank" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "grass_best_rank" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th className="text-center">Country</th>
                      <th
                        onClick={() => sorting("name")}
                        className="w-25 text-start"
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Name
                        </a>
                        {"\xa0"}
                        {column === "name" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "name" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("grass")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          ELO Rating
                        </a>
                        {"\xa0"}
                        {column === "grass" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "grass" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("grass_rating_diff")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          +/-
                        </a>
                        {"\xa0"}
                        {column === "grass_rating_diff" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "grass_rating_diff" &&
                          order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("grass_high")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Peak Rating
                        </a>
                        {"\xa0"}
                        {column === "grass_high" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "grass_high" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("age")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Age
                        </a>
                        {"\xa0"}
                        {column === "age" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "age" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center record_tbody">
                    {data != null ? (
                      <>
                        {data.map((record) => (
                          <tr>
                            <td id="rank">
                              {record.overall_ch == true ? (
                                <>
                                  <SuitDiamondFill
                                    size={10}
                                    color="#ffbb00"
                                    className="career-high-crown"
                                  />
                                </>
                              ) : (
                                <> </>
                              )}
                              {record.grass_rank}
                            </td>
                            <td id="updown">
                              {record.grass_rank_diff > 0 ? (
                                <PositiveElo content={record.grass_rank_diff} />
                              ) : record.grass_rank_diff < 0 ? (
                                <NegativeElo content={record.grass_rank_diff} />
                              ) : (
                                <>{"\xa0"}</>
                              )}
                            </td>
                            <td id="bestrank">{record.grass_best_rank}</td>
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
                            <td className="w-25 text-start" id="name">
                              <a href={`./` + record.player_id}>
                                {toTitleCase(record.name)}
                              </a>
                            </td>
                            <td id="ranking">{record.grass}</td>
                            <td id="+/-">
                              {record.grass_rating_diff > 0 ? (
                                <PositiveElo
                                  content={record.grass_rating_diff}
                                />
                              ) : record.grass_rating_diff < 0 ? (
                                <NegativeElo
                                  content={record.grass_rating_diff}
                                />
                              ) : (
                                <>{"\xa0"}</>
                              )}
                            </td>
                            <td id="record_high">{record.grass_high}</td>
                            <td id="age">{record.age}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <h3>You have not set any goals</h3>
                    )}
                  </tbody>
                </table>
              </div>
              <div
                class={
                  toggleRecords === 5
                    ? "tab-pane fade bg-white rounded show active"
                    : "tab-pane fade bg-white rounded"
                }
              >
                <table
                  class="table table-borderless table-responsive liverating-table-bg-white"
                  cellSpacing="0"
                >
                  <thead className="record_thead">
                    <tr className="text-center">
                      <th onClick={() => sorting("atp_rank")}>
                        <a style={{ color: "inherit" }} href="#/">
                          Rank
                        </a>
                        {"\xa0"}
                        {column === "atp_rank" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "atp_rank" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th onClick={() => sorting("atp_rank_diff")}>
                        <a style={{ color: "inherit" }} href="#/">
                          <ArrowUp />
                          <ArrowDown />
                        </a>
                        {"\xa0"}
                        {column === "atp_rank_diff" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "atp_rank_diff" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("atp_best_rank")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Best Rank
                        </a>
                        {"\xa0"}
                        {column === "atp_best_rank" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "atp_best_rank" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th className="text-center">Country</th>
                      <th
                        onClick={() => sorting("name")}
                        className="w-25 text-start"
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Name
                        </a>
                        {"\xa0"}
                        {column === "name" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "name" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("atp")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          ATP
                        </a>
                        {"\xa0"}
                        {column === "atp" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "atp" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("atp_rating_diff")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          +/-
                        </a>
                        {"\xa0"}
                        {column === "atp_rating_diff" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "atp_rating_diff" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("atp_best_rating")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Peak ATP
                        </a>
                        {"\xa0"}
                        {column === "atp_best_rating" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "atp_best_rating" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                      <th
                        className="text-center"
                        onClick={() => sorting("age")}
                      >
                        <a style={{ color: "inherit" }} href="#/">
                          Age
                        </a>
                        {"\xa0"}
                        {column === "age" && order === "ASC" ? (
                          <CaretDownFill />
                        ) : column === "age" && order === "DSC" ? (
                          <CaretUpFill />
                        ) : (
                          <></>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center record_tbody">
                    {data != null ? (
                      <>
                        {data.map((record) => (
                          <tr>
                            <td id="rank">
                              {record.overall_ch == true ? (
                                <>
                                  <SuitDiamondFill
                                    size={10}
                                    color="#ffbb00"
                                    className="career-high-crown"
                                  />
                                </>
                              ) : (
                                <> </>
                              )}
                              {record.atp_rank}
                            </td>
                            <td id="updown">
                              {record.atp_rank_diff > 0 ? (
                                <PositiveElo content={record.atp_rank_diff} />
                              ) : record.atp_rank_diff < 0 ? (
                                <NegativeElo content={record.atp_rank_diff} />
                              ) : (
                                <>{"\xa0"}</>
                              )}
                            </td>
                            <td id="bestrank">{record.atp_best_rank}</td>
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
                            <td className="w-25 text-start" id="name">
                              <a href={`./` + record.player_id}>
                                {toTitleCase(record.name)}
                              </a>
                            </td>
                            <td id="ranking">{record.atp}</td>
                            <td id="+/-">
                              {record.atp_rating_diff > 0 ? (
                                <PositiveElo content={record.atp_rating_diff} />
                              ) : record.atp_rating_diff < 0 ? (
                                <NegativeElo content={record.atp_rating_diff} />
                              ) : (
                                <>{"\xa0"}</>
                              )}
                            </td>
                            <td id="record_high">{record.atp_best_rating}</td>
                            <td id="age">{record.age}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <h3>You have not set any goals</h3>
                    )}
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
