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
import { useNavigate } from "react-router-dom";

function toTitleCase(str) {
  var parsed = str;

  if (parsed.slice(0, 3).toLowerCase() === "zz_") {
    parsed = parsed.slice(3);
  }

  if (parsed.toLowerCase() === "mcenroe john") {
    return "McEnroe John";
  }

  return parsed.replace(/\w\S*/g, function (txt) {
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
  const navigate = useNavigate();
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

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [DataPerPage, setDataPerPage] = useState(20);

  //Get index of the last Data
  const indexOfLastData = currentPage * DataPerPage;
  const indexOfFirstData = indexOfLastData - DataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setData([...records].sort(alphabetically(true, sortBy)));
  }, [api_isLoading]);

  useEffect(() => {
    if (props.data != null) {
      if (props.data.length > 0) {
        setData(props.data.sort(alphabetically(true, sortBy)));
      }
    }
    setDataPerPage(props.dataPerPage);
    setCurrentPage(1);
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
        <div className="col-lg-8">
          <ClipLoader cssOverride={override} size={70} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="col-lg-8">
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
                setData([...records].sort(alphabetically(true, "hard_rank")));
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
                setData([...records].sort(alphabetically(true, "clay_rank")));
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
                setData([...records].sort(alphabetically(true, "grass_rank")));
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
                setData([...records].sort(alphabetically(true, "atp_rank")));
                setsortBy("atp_rank");
              }}
            >
              ATP
            </a>
          </div>
        </nav>
        <table class="table table-borderless table-responsive liverating-table-bg-white">
          <thead className="record_thead">
            <tr className="text-center">
              <th
                onClick={() =>
                  toggleRecords === 1 ? (
                    sorting("overall_rank")
                  ) : toggleRecords === 2 ? (
                    sorting("hard_rank")
                  ) : toggleRecords === 3 ? (
                    sorting("clay_rank")
                  ) : toggleRecords === 4 ? (
                    sorting("grass_rank")
                  ) : toggleRecords === 5 ? (
                    sorting("atp_rank")
                  ) : (
                    <></>
                  )
                }
              >
                <a style={{ color: "inherit" }} href="#/">
                  Rank
                </a>
                {"\xa0"}
                {toggleRecords === 1 ? (
                  <>
                    {column === "overall_rank" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "overall_rank" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 2 ? (
                  <>
                    {column === "hard_rank" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "hard_rank" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 3 ? (
                  <>
                    {column === "clay_rank" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "clay_rank" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 4 ? (
                  <>
                    {column === "grass_rank" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "grass_rank" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 5 ? (
                  <>
                    {column === "atp_rank" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "atp_rank" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </th>
              <th
                onClick={() =>
                  toggleRecords === 1 ? (
                    sorting("overall_rank_diff")
                  ) : toggleRecords === 2 ? (
                    sorting("hard_rank_diff")
                  ) : toggleRecords === 3 ? (
                    sorting("clay_rank_diff")
                  ) : toggleRecords === 4 ? (
                    sorting("grass_rank_diff")
                  ) : toggleRecords === 5 ? (
                    sorting("atp_rank_diff")
                  ) : (
                    <></>
                  )
                }
              >
                <a style={{ color: "inherit" }} href="#/">
                  <ArrowUp />
                  <ArrowDown />
                </a>
                {toggleRecords === 1 ? (
                  <>
                    {column === "overall_rank_diff" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "overall_rank_diff" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 2 ? (
                  <>
                    {column === "hard_rank_diff" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "hard_rank_diff" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 3 ? (
                  <>
                    {column === "clay_rank_diff" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "clay_rank_diff" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 4 ? (
                  <>
                    {column === "grass_rank_diff" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "grass_rank_diff" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 5 ? (
                  <>
                    {column === "atp_rank_diff" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "atp_rank_diff" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </th>
              <th
                className="text-center" 
                style={{width:"12%"}}
                onClick={() =>
                  toggleRecords === 1 ? (
                    sorting("overall_best_rank")
                  ) : toggleRecords === 2 ? (
                    sorting("hard_best_rank")
                  ) : toggleRecords === 3 ? (
                    sorting("clay_best_rank")
                  ) : toggleRecords === 4 ? (
                    sorting("grass_best_rank")
                  ) : toggleRecords === 5 ? (
                    sorting("atp_best_rank")
                  ) : (
                    <></>
                  )
                }
              >
                <a style={{ color: "inherit" }} href="#/">
                  Best Rank
                </a>
                {"\xa0"}
                {toggleRecords === 1 ? (
                  <>
                    {column === "overall_best_rank" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "overall_best_rank" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 2 ? (
                  <>
                    {column === "hard_best_rank" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "hard_best_rank" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 3 ? (
                  <>
                    {column === "clay_best_rank" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "clay_best_rank" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 4 ? (
                  <>
                    {column === "grass_best_rank" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "grass_best_rank" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 5 ? (
                  <>
                    {column === "atp_best_rank" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "atp_best_rank" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </th>
              <th className="text-center">Country</th>
              <th onClick={() => sorting("name")} className="w-25 text-start">
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
                onClick={() =>
                  toggleRecords === 1 ? (
                    sorting("ranking")
                  ) : toggleRecords === 2 ? (
                    sorting("hard")
                  ) : toggleRecords === 3 ? (
                    sorting("clay")
                  ) : toggleRecords === 4 ? (
                    sorting("grass")
                  ) : toggleRecords === 5 ? (
                    sorting("atp")
                  ) : (
                    <></>
                  )
                }
              >
                <a style={{ color: "inherit" }} href="#/">
                  Rating
                </a>
                {"\xa0"}
                {toggleRecords === 1 ? (
                  <>
                    {column === "ranking" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "ranking" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 2 ? (
                  <>
                    {column === "hard" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "hard" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 3 ? (
                  <>
                    {column === "clay" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "clay" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 4 ? (
                  <>
                    {column === "grass" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "grass" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 5 ? (
                  <>
                    {column === "atp" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "atp" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </th>
              <th
                className="text-center"
                onClick={() =>
                  toggleRecords === 1 ? (
                    sorting("overall_rating_diff")
                  ) : toggleRecords === 2 ? (
                    sorting("hard_rating_diff")
                  ) : toggleRecords === 3 ? (
                    sorting("clay_rating_diff")
                  ) : toggleRecords === 4 ? (
                    sorting("grass_rating_diff")
                  ) : toggleRecords === 5 ? (
                    sorting("atp_rating_diff")
                  ) : (
                    <></>
                  )
                }
              >
                <a style={{ color: "inherit" }} href="#/">
                  +/-
                </a>
                {"\xa0"}

                {toggleRecords === 1 ? (
                  <>
                    {column === "overall_rating_diff" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "overall_rating_diff" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 2 ? (
                  <>
                    {column === "hard_rating_diff" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "hard_rating_diff" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 3 ? (
                  <>
                    {column === "clay_rating_diff" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "clay_rating_diff" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 4 ? (
                  <>
                    {column === "grass_rating_diff" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "grass_rating_diff" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 5 ? (
                  <>
                    {column === "atp_rating_diff" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "atp_rating_diff" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </th>
              <th
                className="text-center"
                onClick={() =>
                  toggleRecords === 1 ? (
                    sorting("record_high")
                  ) : toggleRecords === 2 ? (
                    sorting("hard_high")
                  ) : toggleRecords === 3 ? (
                    sorting("clay_high")
                  ) : toggleRecords === 4 ? (
                    sorting("grass_high")
                  ) : toggleRecords === 5 ? (
                    sorting("atp_high")
                  ) : (
                    <></>
                  )
                }
              >
                <a style={{ color: "inherit" }} href="#/">
                  Peak
                </a>
                {"\xa0"}
                {toggleRecords === 1 ? (
                  <>
                    {column === "record_high" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "record_high" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 2 ? (
                  <>
                    {column === "hard_high" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "hard_high" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 3 ? (
                  <>
                    {column === "clay_high" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "clay_high" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 4 ? (
                  <>
                    {column === "grass_high" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "grass_high" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : toggleRecords === 5 ? (
                  <>
                    {column === "atp_high" && order === "ASC" ? (
                      <CaretDownFill />
                    ) : column === "atp_high" && order === "DSC" ? (
                      <CaretUpFill />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </th>
              <th className="text-center" onClick={() => sorting("age")}>
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
            {currentData != null ? (
              <>
                {currentData.map((record) => (
                  <tr>
                    <td id="rank">
                      {toggleRecords === 1 ? (
                        <>
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
                        </>
                      ) : toggleRecords === 2 ? (
                        <>
                          {record.hard_ch == true ? (
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
                        </>
                      ) : toggleRecords === 3 ? (
                        <>
                          {record.clay_ch == true ? (
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
                        </>
                      ) : toggleRecords === 4 ? (
                        <>
                          {record.grass_ch == true ? (
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
                        </>
                      ) : toggleRecords === 5 ? (
                        <>
                          {record.atp_ch == true ? (
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
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td id="updown">
                      {toggleRecords === 1 ? (
                        <>
                          {record.overall_rank_diff > 0 ? (
                            <PositiveElo content={record.overall_rank_diff} />
                          ) : record.overall_rank_diff < 0 ? (
                            <NegativeElo content={record.overall_rank_diff} />
                          ) : (
                            <>{"\xa0"}</>
                          )}
                        </>
                      ) : toggleRecords === 2 ? (
                        <>
                          {record.hard_rank_diff > 0 ? (
                            <PositiveElo content={record.hard_rank_diff} />
                          ) : record.hard_rank_diff < 0 ? (
                            <NegativeElo content={record.hard_rank_diff} />
                          ) : (
                            <>{"\xa0"}</>
                          )}
                        </>
                      ) : toggleRecords === 3 ? (
                        <>
                          {record.clay_rank_diff > 0 ? (
                            <PositiveElo content={record.clay_rank_diff} />
                          ) : record.clay_rank_diff < 0 ? (
                            <NegativeElo content={record.clay_rank_diff} />
                          ) : (
                            <>{"\xa0"}</>
                          )}
                        </>
                      ) : toggleRecords === 4 ? (
                        <>
                          {record.grass_rank_diff > 0 ? (
                            <PositiveElo content={record.grass_rank_diff} />
                          ) : record.grass_rank_diff < 0 ? (
                            <NegativeElo content={record.grass_rank_diff} />
                          ) : (
                            <>{"\xa0"}</>
                          )}
                        </>
                      ) : toggleRecords === 5 ? (
                        <>
                          {record.atp_rank_diff > 0 ? (
                            <PositiveElo content={record.atp_rank_diff} />
                          ) : record.atp_rank_diff < 0 ? (
                            <NegativeElo content={record.atp_rank_diff} />
                          ) : (
                            <>{"\xa0"}</>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td id="bestrank" style={{width:"12%"}}>
                      {toggleRecords === 1 ? (
                        <>{record.overall_best_rank}</>
                      ) : toggleRecords === 2 ? (
                        <>{record.hard_best_rank}</>
                      ) : toggleRecords === 3 ? (
                        <>{record.clay_best_rank}</>
                      ) : toggleRecords === 4 ? (
                        <>{record.grass_best_rank}</>
                      ) : toggleRecords === 5 ? (
                        <>{record.atp_best_rank}</>
                      ) : (
                        <></>
                      )}
                    </td>
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
                      <a
                        href="#/"
                        onClick={() =>
                          navigate(`./players/` + record.player_id)
                        }
                      >
                        {toTitleCase(record.name)}
                      </a>
                    </td>
                    <td id="ranking">
                      {toggleRecords === 1 ? (
                        <>{record.ranking}</>
                      ) : toggleRecords === 2 ? (
                        <>{record.hard}</>
                      ) : toggleRecords === 3 ? (
                        <>{record.clay}</>
                      ) : toggleRecords === 4 ? (
                        <>{record.grass}</>
                      ) : toggleRecords === 5 ? (
                        <>{record.atp}</>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td id="+/-">
                      {toggleRecords === 1 ? (
                        <>
                          {record.overall_rating_diff > 0 ? (
                            <PositiveElo content={record.overall_rating_diff} />
                          ) : record.overall_rating_diff < 0 ? (
                            <NegativeElo content={record.overall_rating_diff} />
                          ) : (
                            <>{"\xa0"}</>
                          )}
                        </>
                      ) : toggleRecords === 2 ? (
                        <>
                          {record.hard_rating_diff > 0 ? (
                            <PositiveElo content={record.hard_rating_diff} />
                          ) : record.hard_rating_diff < 0 ? (
                            <NegativeElo content={record.hard_rating_diff} />
                          ) : (
                            <>{"\xa0"}</>
                          )}
                        </>
                      ) : toggleRecords === 3 ? (
                        <>
                          {record.clay_rating_diff > 0 ? (
                            <PositiveElo content={record.clay_rating_diff} />
                          ) : record.clay_rating_diff < 0 ? (
                            <NegativeElo content={record.clay_rating_diff} />
                          ) : (
                            <>{"\xa0"}</>
                          )}
                        </>
                      ) : toggleRecords === 4 ? (
                        <>
                          {record.grass_rating_diff > 0 ? (
                            <PositiveElo content={record.grass_rating_diff} />
                          ) : record.grass_rating_diff < 0 ? (
                            <NegativeElo content={record.grass_rating_diff} />
                          ) : (
                            <>{"\xa0"}</>
                          )}
                        </>
                      ) : toggleRecords === 5 ? (
                        <>
                          {record.atp_rating_diff > 0 ? (
                            <PositiveElo content={record.atp_rating_diff} />
                          ) : record.atp_rating_diff < 0 ? (
                            <NegativeElo content={record.atp_rating_diff} />
                          ) : (
                            <>{"\xa0"}</>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td id="record_high">
                      {toggleRecords === 1 ? (
                        <>{record.record_high}</>
                      ) : toggleRecords === 2 ? (
                        <>{record.hard_high}</>
                      ) : toggleRecords === 3 ? (
                        <>{record.clay_high}</>
                      ) : toggleRecords === 4 ? (
                        <>{record.grass_high}</>
                      ) : toggleRecords === 5 ? (
                        <>{record.atp_high}</>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td id="age">{record.age}</td>
                  </tr>
                ))}
              </>
            ) : (
              <h3>You have not set any goals</h3>
            )}
          </tbody>
        </table>
        {DataPerPage > 100 ? (
          <></>
        ) : (
          <div className="row">
            <nav className="pagination-outer">
              <ul className="pagination">
                <Pagination
                  DataPerPage={DataPerPage}
                  totalData={data.length}
                  paginate={paginate}
                />
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
