import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import bg_img from "../img/bg-liveratings.png";
import LiveRatingsTable from "../components/Tables/LiveRatingsTable";
import SideTables from "../components/Tables/SideTables";
import Footer from "../components/Footer/Footer";
 
import { loadData } from "../../features/api/apiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";   
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

export default function Charts() {
  const { players, records, api_isLoading } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    if (records.length == 0) {
      dispatch(loadData());
    }
  }, []); 
 
  return (
    <>
      <div
        className="liverating-bg"
        style={{ backgroundImage: `url(${bg_img})` }}
      >
        <div className="px-5 py-4">
          <div className="p-2 w-50">
            <h1 className="fs-3">
              <b>Welcome to Live Tennis ELO Ratings!</b>
            </h1>
            <p>
              Your go-to place for men's professional tennis statistics! Track
              your favorite player's ratings with the help of graphs and compare
              them to their rivals.
            </p>
          </div>
          <div className="w-50">
            <div className="input-group pt-3 pb-3">
              <div className="input-group">
                <div className="me-4">
                  <Dropdown className="border rounded-3">
                    <Dropdown.Toggle
                      className="o40"
                      variant="white"
                      id="dropdown-basic"
                      size="sm"
                    >
                      2022
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/">2021</Dropdown.Item>
                      <Dropdown.Item href="#/">2020</Dropdown.Item>
                      <Dropdown.Item href="#/">2019</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <span className="input-group-button">
                  <button
                    className="btn btn-white border-0 dropdown rounded-3 me-2"
                    type="submit"
                  >
                    <ChevronLeft color="gray" style={{ fontSize: "18px" }} />
                  </button>
                </span>
                <Dropdown className="border rounded-3">
                  <Dropdown.Toggle
                    className="o40"
                    variant="white"
                    id="dropdown-basic"
                    size="sm"
                  >
                    27/06/2022
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/2022/27/06">
                      2022/27/06
                    </Dropdown.Item>
                    <Dropdown.Item href="#/2022/26/06">
                      2022/26/06
                    </Dropdown.Item>
                    <Dropdown.Item href="#/2022/25/06">
                      2022/25/06
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <span className="input-group-button">
                  <button
                    className="btn btn-white border-0 dropdown rounded-3 ms-2 me-4"
                    type="submit"
                  >
                    <ChevronRight color="gray" style={{ fontSize: "18px" }} />
                  </button>
                </span> 
              </div>
            </div>
          </div>
          <div className="row">
            <LiveRatingsTable />
            <SideTables />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
