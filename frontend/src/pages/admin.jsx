import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Switch, BrowserRouter as Route, Link } from "react-router-dom";
import { Search } from "react-bootstrap-icons";

function admin_navbar() {
    return [
        <nav className="navbar navbar-expand-md px-3 py-3 navbar-light bg-light border border-3 rounded-bottom" aria-label="Fourth navbar example">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="/">Live Tennis Elo Ratings</a>
                <button className="btn bg-transparent px-3 py-1" type="submit" title="Logout">
                    <img src={require('../img/Logout.png')} className="input-group-prepend bg-transparent border-0"></img>
                </button>
            </div>
        </nav>,
        <>
            <Outlet />
        </>
    ];
}


export default admin_navbar;