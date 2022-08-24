import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination";
import {
  deleteIndRecord,
  loadRecord,
  resetRecords,
} from "../../../features/records/recordsSlice";
import { EditRecord } from "../records/EditModal";
import { TrashFill } from "react-bootstrap-icons";
import { useEffect } from "react";

export default function RecordItem(recs) {
  const [data, setData] = useState(recs.records);
  const [order, setOrder] = useState("ASC");
  const { records } = useSelector((state) => state.records);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(recs.records);
  }, [recs]);

  const sorting = (col) => {
    if (order === "ASC") {
      var sorted = null;
      if (col === "player_id" || col === "name") {
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
      if (col === "player_id" || col === "name") {
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
  return (
    <div className="input-group px-2">
      <table className="table table-borderless text-center">
        <thead>
          <tr>
            <th onClick={() => sorting("player_id")} scope="col">
              Player ID
            </th>
            <th
              onClick={() => sorting("name")}
              style={{ textAlign: "left" }}
              scope="col"
            >
              Name
            </th>
            <th onClick={() => sorting("ranking")} scope="col">
              Overall
            </th>
            <th onClick={() => sorting("hard")} scope="col">
              Hard
            </th>
            <th onClick={() => sorting("clay")} scope="col">
              Clay
            </th>
            <th onClick={() => sorting("grass")} scope="col">
              Grass
            </th>
            <th onClick={() => sorting("atp")} scope="col">
              ATP
            </th>
            <th onClick={() => sorting("last_active")} scope="col">
              Last Active
            </th>
            <th style={{ minWidth: 25 }} scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data != null ? (
            <>
              {data.map((record) => (
                <tr>
                  <th scope="row">{record.player_id}</th>
                  <td className="text-start" id="name">
                    {record.name}
                  </td>
                  <td id="overall">{record.ranking}</td>
                  <td className="table-hard" id="hard">
                    {record.hard}
                  </td>
                  <td className="table-clay" id="clay">
                    {record.clay}
                  </td>
                  <td className="table-grass" id="grass">
                    {record.grass}
                  </td>
                  <td id="atp">{record.atp}</td>
                  <td id="lactive">{record.last_active.split(" ")[0]}</td>
                  <td id="edit">
                    <EditRecord props={record} /> &nbsp;
                    <a
                      href="#"
                      onClick={() => {
                        dispatch(
                          deleteIndRecord({
                            _id: record._id,
                            doc_date: record.doc_date,
                          })
                        );
                        window.location.reload(false);
                      }}
                    >
                      <TrashFill />
                    </a>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <h3>You have not set any goals</h3>
          )}
        </tbody>
      </table>
      <div></div>
      <div className="ms-auto">
        <Pagination />
      </div>
    </div>
  );
}
