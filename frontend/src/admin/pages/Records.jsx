import { Search, TrashFill } from "react-bootstrap-icons";
import { SurfaceLegend } from "../components/Legend";
import RecordTable from "../components/records/RecordTable";
import ClipLoader from "react-spinners/ClipLoader";
import ReactGA from "react-ga";

//Backend
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  loadRecord,
  resetRecords,
  latestRecord,
  deleteRecord,
} from "../../features/records/recordsSlice";
import { RecordChoices } from "../components/records/RecordChoices";
import { loadPlayers } from "../../features/players/playersSlice";

function Records() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Redirect if not logged in
  const { doc_date } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { records, isLoading, latest, choices } = useSelector(
    (state) => state.records
  );
  const { players } = useSelector((state) => state.players);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/admin-login");
    }
    if (players.length === 0) {
      dispatch(loadPlayers());
    }
    if (latest == null) {
      dispatch(latestRecord());
    }
    if (doc_date === "null") {
      dispatch(latestRecord()).then((e) => {
        navigate("/admin/" + e.payload.record.doc_date);
      });
    } else {
      dispatch(loadRecord({ doc_date: doc_date }));
    }
  }, [user, navigate]);

  const onDelete = () => {
    dispatch(resetRecords());
    dispatch(deleteRecord({ doc_date: doc_date })).then(() =>
      navigate("/admin/null")
    );
  };

  //Document selector

  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  const [data, setData] = useState(records[0]);
  const [len, setLen] = useState(0);
  const onSearch = (e) => {
    if (e.target.value != "") {
      setLen(e.target.value.length);
      setData(
        records[0].filter((o) =>
          Object.keys(o).some((k) =>
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      );
    } else {
      setLen(e.target.value.length);
      setData([...records[0]]);
    }
  };

  if (records.length == 0 || isLoading) {
    return <ClipLoader cssOverride={override} size={70} />;
  }
  return (
    <>
      <div>
        <h1 className="fw-bold fs-4">Tennis Records</h1>
      </div>

      {/* main search + filters */}
      <div className="input-group pt-3 pb-3 mx-3">
        <div className="me-4">
          <RecordChoices choices={choices} />
        </div>
        <div className="input-group" style={{ width: "30%" }}>
          <input
            className="form-control border-0 dropdown rounded-3"
            type="text"
            placeholder="Search Record"
            aria-label="Search Record"
            onChange={onSearch}
            onR
          />
          <span className="input-group-button">
            <button className="btn btn-green search-btn px-3 py-1">
              <Search color="white" className="fs-7" />
            </button>
          </span>
        </div>
      </div>
      {/* utilities */}
      <div className="input-group px-2">
        <div className="py-1">
          <a href="#">
            <TrashFill className="fs-6 me-3" color="red" onClick={onDelete} />
          </a>
          {/* <Download className="fs-6" /> */}
        </div>
        <div className="ms-auto d-flex align-items-start">
          <SurfaceLegend />
        </div>
      </div>
      {/* tables */}
      {len > 0 ? (
        <RecordTable records={data} />
      ) : (
        <RecordTable records={records[0]} />
      )}
    </>
  );
}

export default Records;
