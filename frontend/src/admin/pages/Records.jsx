import {
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  TrashFill, 
} from "react-bootstrap-icons";
import {
  YearDropdown,
  DateDropdown,
  RowsDropdown,
} from "../components/Dropdown";
import Pagination from "../components/Pagination";
import { SearchRecords } from "../components/Search";
import { SurfaceLegend } from "../components/Legend";
import RecordItem from "../components/records/RecordItem";

//Backend
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadRecord, reset } from "../../features/records/recordsSlice";

function Records() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Redirect if not logged in
  const { doc_date } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { records, isLoading, isError, message } = useSelector(
    (state) => state.records
  );

  useEffect(() => {
    if (isError) {
      console.log(message); 
    }

    if (!user) {
      navigate("/admin-login");
    }

    dispatch(loadRecord({ doc_date: doc_date }));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

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
            <TrashFill className="fs-6 me-3" color="red" />
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
        <div className="input-group px-2">
          <table className="table table-borderless text-center">
            <thead>
              <tr>
                <th scope="col">Player ID</th>
                <th style={{ textAlign: "left" }} scope="col">
                  Name
                </th>
                <th scope="col">Overall</th>
                <th scope="col">Hard</th>
                <th scope="col">Clay</th>
                <th scope="col">Grass</th>
                <th scope="col">ATP</th>
                <th scope="col">Last Active</th>
                <th style={{ minWidth: 25 }} scope="col"> 
                </th>
              </tr>
            </thead>
            <tbody>
              {records[0] != null ? (
                <>
                  {records[0].map((record) => (
                    <RecordItem key={record._id} record={record} />
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
      </div>
    </>
  );
}

export default Records;
