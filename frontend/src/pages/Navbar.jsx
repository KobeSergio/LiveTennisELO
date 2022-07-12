import React from "react";
import '../css/admin/main.css';
import { Navbar, Nav } from "react-bootstrap";
import { Switch, BrowserRouter as Route, Link } from "react-router-dom";
import { Search } from "react-bootstrap-icons";

function navbar() {
  return [
    <nav className="navbar navbar-expand-md px-3 py-3 navbar-light bg-light border border-3 rounded-bottom" aria-label="Fourth navbar example">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">Live Tennis Elo Ratings</a>

            <div className="navbar-nav me-auto ms-5">
              <a class="nav-link" href="/">Live Ratings</a>
              <a class="nav-link ms-4" href="charts">Charts</a>
              <a class="nav-link ms-4" href="about">About</a>
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