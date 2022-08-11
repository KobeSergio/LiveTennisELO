import React from "react";
import './main.css';
import { Search } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

function navbar() {
  return [
    <nav className="navbar navbar-expand-md px-3 py-3 navbar-light bg-light border-bottom border-2 rounded-bottom" aria-label="Fourth navbar example">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">Live Tennis ELO Ratings</a>

            <div className="navbar-nav me-auto ms-5">
              <NavLink
                  className="nav-link me-4"
                  activeclassname="nav-link active add_underline"
                  to="/"
                >
                  <a data-toggle="pill" role="tab" aria-selected="false">
                    Live Ratings
                  </a>
                </NavLink>

                <NavLink
                  className="nav-link me-4"
                  activeclassname="nav-link active"
                  to="/charts"
                >
                  <a data-toggle="pill" role="tab" aria-selected="false">
                    Charts
                  </a>
                </NavLink>

                <NavLink
                  className="nav-link"
                  activeclassname="nav-link active"
                  to="/about"
                >
                  <a data-toggle="pill" aria-selected="false">
                    About
                  </a>
                </NavLink>
            </div>

          <form>
          <div className="input-group">
            <input className="form-control border-0"  type="text" placeholder="Search Player" aria-label="Search Player" />
            <div className="input-group-prepend">
            <span class="input-group-button">
              <button className="btn btn-green search-btn px-3 py-1" type="submit">
              <Search color="white" className="fs-7"/>
              </button>
            </span>

          </div>
        </div>
          </form>
      </div>
    </nav>
  ];
}

export default navbar;