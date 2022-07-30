import React from "react";
import { Download, Search, TrashFill } from "react-bootstrap-icons";
import ReactCountryFlag from 'react-country-flag';
import { Filter, RowsDropdown } from '../components/Dropdown';
import Pagination from '../components/Pagination';
import { SearchPlayers } from "../components/Search";
import { useNavigate } from "react-router-dom";


function Players() {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <h1 className="fw-bold fs-4">Player's Data</h1>
            </div>


            {/* main search + filters */}
            <div className="input-group pt-3 pb-3 mx-3 ">
                <div className="me-4">
                    <div className="input-group">
                        <div className="me-4">
                            <Filter />
                        </div>

                    </div>
                </div>

                <SearchPlayers />

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
                                <th scope="col">Country</th>
                                <th scope="col">Name</th>
                                <th scope="col">ATP</th>
                                <th scope="col">Overall</th>
                                <th scope="col">Peak</th>
                                <th className="text-start" scope="col">Hard Peak</th>
                                <th className="text-start" scope="col">Clay Peak</th>
                                <th className="text-start" scope="col">Grass Peak</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            <tr onClick={() => navigate('manage')}>
                                <th scope="row">RS0010</th>
                                <th className="table-40px" scope="row"><ReactCountryFlag countryCode="RU" style={{ filter: "drop-shadow(0 0 0.12rem black)" }} svg /></th>
                                <td className="text-start" id="name">Novak Djokovic</td>
                                <td className="table-40px" id="atp">3000</td>
                                <td className="table-40px" id="overall">3161</td>
                                <td className="table-120px" id="peak">3216 (2014-07)</td>
                                <td className="table-hard table-160px" id="hard">3076 3115 (2014-06)</td>
                                <td className="table-clay table-160px" id="clay">2919 2934 (2019-12)</td>
                                <td className="table-grass table-160px" id="grass">2824 2824 (2014-07)</td>
                            </tr>
                            <tr>
                                <th scope="row">CH0020</th>
                                <th className="table-40px" scope="row"><ReactCountryFlag countryCode="CH" style={{ filter: "drop-shadow(0 0 0.12rem black)" }} svg /></th>
                                <td className="text-start" id="name">Roger Federer</td>
                                <td className="table-40px" id="atp">3000</td>
                                <td className="table-40px" id="overall">3161</td>
                                <td className="table-120px" id="peak">3216 (2014-07)</td>
                                <td className="table-hard table-160px" id="hard">3076 3115 (2014-06)</td>
                                <td className="table-clay table-160px" id="clay">2919 2934 (2019-12)</td>
                                <td className="table-grass table-160px" id="grass">2824 2824 (2014-07)</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="ms-auto">
                        <Pagination />
                    </div>
                </div>
            </div>


        </>

    );
}

export default Players;
