import React from "react";
import { ChevronLeft, ChevronRight, Download, Search, TrashFill } from "react-bootstrap-icons";
import Dropdown from 'react-bootstrap/Dropdown';

function YearDropdown() {
    return (
        <Dropdown className="border rounded-3">
            <Dropdown.Toggle className="o40" variant="white" id="dropdown-basic" size="sm">
                2022
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/2021">2021</Dropdown.Item>
                <Dropdown.Item href="#/2020">2020</Dropdown.Item>
                <Dropdown.Item href="#/2019">2019</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function DateDropdown() {
    return (
        <Dropdown className="border rounded-3">
            <Dropdown.Toggle className="o40" variant="white" id="dropdown-basic" size="sm">
                27/06/2022
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/2022/27/06">2022/27/06</Dropdown.Item>
                <Dropdown.Item href="#/2022/26/06">2022/26/06</Dropdown.Item>
                <Dropdown.Item href="#/2022/25/06">2022/25/06</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function RowsDropdown() {
    return (
        <Dropdown className="border rounded-3">
            <Dropdown.Toggle className="o40" variant="white" id="dropdown-basic" size="sm">
                10 per page
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/">15 per page</Dropdown.Item>
                <Dropdown.Item href="#/">20 per page</Dropdown.Item>
                <Dropdown.Item href="#/">25 per page</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function Records() {
    return (
        <>
            <div>
                <h1 className="fw-bold fs-3">Tennis Records</h1>
            </div>


            {/* main search + filters */}
            <div className="input-group pt-3 pb-3 mx-3">
                <div className="me-4">
                    <div className="input-group">
                        <div className="me-4">
                            <YearDropdown />
                        </div>

                        <span className="input-group-button">
                            <button className="btn btn-white border rounded-3 me-2" type="submit">
                                <ChevronLeft color="gray" style={{fontSize: "18px"}} />
                            </button>
                        </span>
                        <DateDropdown />
                        <span className="input-group-button">
                            <button className="btn btn-white border rounded-3 ms-2" type="submit">
                                <ChevronRight color="gray" style={{fontSize: "18px"}} />
                            </button>
                        </span>

                    </div>
                </div>

                <div className="input-group" style={{ width: "30%" }}>
                    <input className="form-control border rounded-3" type="text" placeholder="Search Record" aria-label="Search Record" />
                    <span className="input-group-button">
                        <button className="btn btn-green search-btn px-3 py-1" type="submit">
                            <Search color="white" className="fs-7" />
                        </button>
                    </span>
                </div>

                <div className="ms-auto me-5">
                    <RowsDropdown />
                </div>
            </div>

            {/* utilities */}

            <div className="p-3 mx-3 bg-white" style={{ borderRadius: "10px 10px 0 0" }}>
                <div className="input-group px-2">
                    <div className="py-1">
                        <TrashFill className="fs-6 me-3" color="red" />
                        <Download className="fs-6" />
                    </div>

                    <div className="ms-auto d-flex align-items-start">
                        <div className="me-3">
                            <div className="box hard me-2 rounded" />
                            Hard
                        </div>
                        <div className="me-3">
                            <div className="box clay me-2 rounded" />
                            Clay
                        </div>
                        <div className="me-3">
                            <div className="box grass me-2 rounded" />
                            Grass
                        </div>

                    </div>
                </div>
            </div>

            {/* tables */}
            <div className="p-3 mx-3 bg-white" style={{ borderRadius: "10px 10px 0 0" }}>
                <div className="input-group px-2">
                    <table className="table table-borderless text-center">
                        <thead>
                            <tr>
                                <th scope="col">Player ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Overall</th>
                                <th scope="col">Hard</th>
                                &nbsp;
                                <th scope="col">Clay</th>
                                &nbsp;
                                <th scope="col">Grass</th>
                                <th scope="col">ATP</th>
                                <th scope="col">Last Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">RS0010</th>
                                <td className="text-start" id="name">Novak Djokovic</td>
                                <td id="overall">3161</td>
                                <td className="table-hard" id="hard">3076</td>
                                &nbsp;
                                <td className="table-clay" id="clay">2919</td>
                                &nbsp;
                                <td className="table-grass" id="grass">2824</td>
                                <td id="atp">3151</td>
                                <td id="lactive">01/07/2017</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </>

    );
}

export default Records;
