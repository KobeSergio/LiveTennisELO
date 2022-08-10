import {
  ChevronLeft,
  ChevronRight,
  Download,
  TrashFill,
} from "react-bootstrap-icons";
import {
  YearDropdown,
  DateDropdown,
  RowsDropdown,
} from "../components/Dropdown";
import { SearchRecords } from "../components/Search";
import { SurfaceLegend } from "../components/Legend";
import RecordTable from "../components/records/RecordTable";
import ClipLoader from "react-spinners/ClipLoader";

//Backend
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  loadRecord,
  resetRecords,
  latestRecord,
  deleteRecord,
} from "../../features/records/recordsSlice";
import e from "cors";
import { RecordChoices } from "../components/records/RecordChoices";

function Records() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Redirect if not logged in
  const { doc_date } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { records, isLoading, latest, choices } = useSelector(
    (state) => state.records
  );

  useEffect(() => {
    if (!user) {
      navigate("/admin-login");
    }
    if (latest == null) {
      dispatch(latestRecord());
    }
    if (doc_date === "null") {
      dispatch(latestRecord()).then((e) => {
        console.log(e.payload);
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
        <SearchRecords />
        <div className="ms-auto me-5">
          <RowsDropdown />
        </div>
      </div>

      {/* utilities */}

      <div
        className="p-3 mx-3 bg-white"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <div className="input-group px-2">
          <div className="py-1">
            <a href="#">
              <TrashFill className="fs-6 me-3" color="red" onClick={onDelete} />
            </a>

            <Download className="fs-6" />
          </div>

          <div className="ms-auto d-flex align-items-start">
            <SurfaceLegend />
          </div>
        </div>
      </div>

      {/* tables */}
      <div
        className="p-3 mx-3 bg-white"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <RecordTable />
      </div>
    </>
  );
}

export default Records;
