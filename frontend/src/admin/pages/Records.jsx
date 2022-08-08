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
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  loadRecord,
  deleteRecord,
  latestRecord,
  resetRecords,
  resetStatus,
} from "../../features/records/recordsSlice";

function Records() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Redirect if not logged in
  const { doc_date } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { latest, records, isLoading, isError, message } = useSelector(
    (state) => state.records
  );

  useEffect(() => {
    if (!user || !doc_date) {
      navigate("/admin-login");
    }

    console.log("CALLED ");
    if (latest !== doc_date) {
      navigate("/admin/" + latest);
    }

    dispatch(loadRecord({ doc_date: latest }));
    dispatch(resetRecords());
  }, [user, navigate, dispatch, latest]);

  const onDelete = () => {
    dispatch(deleteRecord({ doc_date: doc_date })).then(() =>
      dispatch(latestRecord())
    );
  };

  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  if (isLoading) {
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
          <div className="input-group">
            <div className="me-4">
              <YearDropdown />
            </div>

            <span className="input-group-button">
              <button
                className="btn btn-white border-0 dropdown rounded-3 me-2"
                type="submit"
              >
                <ChevronLeft color="gray" style={{ fontSize: "18px" }} />
              </button>
            </span>
            <DateDropdown />
            <span className="input-group-button">
              <button
                className="btn btn-white border-0 dropdown rounded-3 ms-2"
                type="submit"
              >
                <ChevronRight color="gray" style={{ fontSize: "18px" }} />
              </button>
            </span>
          </div>
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
            <a href="#" onClick={onDelete}>
              <TrashFill className="fs-6 me-3" color="red" />
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
