import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Table, People, Upload } from 'react-bootstrap-icons';
import Footer from '../components/Footer';

function Content() {
    return (
        <>
            <Outlet />
        </>
    )
}

function Navbar() {
    return (
        <nav className="navbar px-3 py-3 navbar-light" >
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="">Live Tennis ELO Ratings</a>
                <button className="btn bg-transparent px-3 py-1" type="submit" title="Logout">
                    <img src={require('../img/Logout.png')} className="input-group-prepend bg-transparent border-0"></img>
                </button>
            </div>
        </nav>
    );
}

function Sidebar() {
    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <aside className="col-md-2 col-xl-2 px-sm-2 px-0 py-3">
                    <div className="align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-50">
                        <div className="col-10">
                            <div className="nav flex-column nav-pills gap-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <NavLink className="nav-link" activeclassname="nav-link active" to='/admin/'>
                                    <a data-toggle="pill" role="tab" aria-selected="false">
                                        <Table size={15} className="mb-1 me-3" />
                                        Records
                                    </a>
                                </NavLink>

                                <NavLink className="nav-link" activeclassname="nav-link active" to='/admin/players'>
                                    <a data-toggle="pill" role="tab" aria-selected="false">
                                        <People size={15} className="mb-1 me-3" />
                                        Players
                                    </a>
                                </NavLink>


                                <NavLink className="nav-link" activeclassname="nav-link active" to='/admin/import'>
                                    <a data-toggle="pill" aria-selected="false">
                                        <Upload size={15} className="mb-1 me-3" />
                                        Import
                                    </a>
                                </NavLink>

                            </div>
                        </div>
                    </div>
                </aside>
                {/* content */}
                <div className="bg-admin" />
                <main className="col p-5 w-75 h-75">
                    <Content />
                </main>
            </div>
        </div>
    );
}

function AdminNav() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Footer />
        </>
    );
}


export default AdminNav;