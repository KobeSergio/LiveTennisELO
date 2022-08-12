import SearchCountry from "../Search/SearchCountry"
import ShowInactive from "../Toggle/ShowInactive"
import SearchRecords from "../Search/SearchRecords"

import { ArrowUp, ArrowDown } from "react-bootstrap-icons";
import ReactCountryFlag from "react-country-flag";
import { PositiveElo, NegativeElo } from "../Labels/ELO"; 
import Pagination from "../Pagination";

export default function () {
    return (
        <>
            <div className="w-75">
                <div className="row">
                    <div className="col">

                        <nav>
                            <div className="nav nav-tabs pb-1 border-0" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link table-tab-active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Overall</a>
                                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Hard</a>
                                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Clay</a>
                                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Grass</a>
                                <a className="nav-item nav-link me-3" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">ATP</a>

                                {/* SEARCH BY COUNTRY */}
                                <span className="">
                                    <SearchCountry />
                                </span>

                                {/* SHOW INACTIVE */}
                                <span className="ms-4 mt-2">
                                    <ShowInactive />
                                </span>

                                <div className="ms-2 d-flex align-items-center">
                                    <span>Show Inactive</span>
                                </div>

                                {/* SEARCH IN RECORD */}
                                <span className="ms-4">
                                    <SearchRecords />
                                </span>

                            </div>
                        </nav>


                        <div class="tab-content" id="nav-tabContent">

                            <div class="tab-pane fade show active bg-white rounded" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <table class="table table-borderless liverating-table-bg-white" cellSpacing="0">
                                    <thead>
                                        <tr className="text-center">
                                            <th>Rank</th>
                                            <th><ArrowUp /><ArrowDown /></th>
                                            <th>Best Rank</th>
                                            <th>Country</th>
                                            <th className="w-25 text-start">Name</th>
                                            <th>ELO Rating</th>
                                            <th>+/-</th>
                                            <th>Peak Elo Rating</th>
                                            <th>Age</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td id="rank">1</td>
                                            <td id="updown">-</td>
                                            <td id="bestrank">1</td>

                                            <td className="" id="country">
                                                <ReactCountryFlag id="flag_code" countryCode="ES" className="table-country pe-2" style={{ filter: "drop-shadow(0 0 0.12rem black)", fontSize: '1.4em' }} />
                                                <span id="country_code">ES</span>
                                            </td>

                                            <td className="text-start" id="name">Rafael Nadal</td>
                                            <td id="elo_rating">2401</td>
                                            <td id="+/-"><PositiveElo /></td>
                                            <td id="peak_elo_rating">2552</td>
                                            <td id="age">36</td>
                                        </tr>
                                        <tr>
                                            <td id="rank">2</td>
                                            <td id="updown">-</td>
                                            <td id="bestrank">1</td>

                                            <td className="" id="country">
                                                <ReactCountryFlag id="flag_code" countryCode="RS" className="table-country pe-2" style={{ filter: "drop-shadow(0 0 0.12rem black)", fontSize: '1.4em' }} />
                                                <span id="country_code" className="table-country">SE</span>
                                            </td>

                                            <td className="text-start" id="name">Novak Djokovic</td>
                                            <td id="elo_rating">2367</td>
                                            <td id="+/-"><NegativeElo /></td>
                                            <td id="peak_elo_rating">2629</td>
                                            <td id="age">35</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-end">
                                        <Pagination />
                                </div>

                            </div>


                            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <table class="table" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Project Name</th>
                                            <th>Employer</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><a href="#">Work 1</a></td>
                                            <td>Doe</td>
                                            <td>john@example.com</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Work 2</a></td>
                                            <td>Moe</td>
                                            <td>mary@example.com</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Work 3</a></td>
                                            <td>Dooley</td>
                                            <td>july@example.com</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                <table class="table" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Contest Name</th>
                                            <th>Date</th>
                                            <th>Award Position</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><a href="#">Work 1</a></td>
                                            <td>Doe</td>
                                            <td>john@example.com</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Work 2</a></td>
                                            <td>Moe</td>
                                            <td>mary@example.com</td>
                                        </tr>
                                        <tr>
                                            <td><a href="#">Work 3</a></td>
                                            <td>Dooley</td>
                                            <td>july@example.com</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}