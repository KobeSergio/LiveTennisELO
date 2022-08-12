import { BoxArrowUpRight } from "react-bootstrap-icons";
import ReactCountryFlag from "react-country-flag";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export default function() {
    return (
        <>
            <div className="w-25">
                {/* TOP 15 */}
                <h2 className="fs-4">Top 15 of All Time:</h2>
                <div className="row">
                    <div className="col">

                        <nav>
                            <div className="nav nav-tabs border-0" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link table-tab-active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Overall</a>
                                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Hard</a>
                                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Clay</a>
                                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Grass</a>
                                <a className="nav-item nav-link me-3" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">ATP</a>
                            </div>
                        </nav>


                        <div class="tab-content" id="nav-tabContent">

                            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <table class="table table-borderless liverating-table-bg-white" cellspacing="0">
                                    <thead>
                                        <tr className="text-center">
                                            <th style={{ width: "15%" }}>Rank</th>
                                            <th style={{ width: "60%" }} className="text-start">Name</th>
                                            <th style={{ width: "25%" }}>ELO Rating</th>
                                            <th style={{ width: "15%" }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td id="rank">1</td>

                                            <td className="text-start" id="name">

                                                <ReactCountryFlag id="flag_code" countryCode="ES" className="table-country pe-2" style={{ filter: "drop-shadow(0 0 0.12rem black)", fontSize: '1.2em' }} />
                                                <span className="table-country">Rafael Nadal</span>

                                            </td>


                                            <td id="elo_rating">2401</td>
                                            <td id="date">02-2016</td>
                                        </tr>
                                    </tbody>
                                </table>
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

                {/* NEWS */}
                <h2 className="fs-4">News:</h2>
                <div className="row mb-4">
                    <div className="col">
                        <div className="p-2">
                            <TwitterTimelineEmbed
                                sourceType="profile"
                                screenName="tennis"
                                options={{ height: 600 }}
                                noHeader="true"
                                noFooter="true"
                                noScrollbar="true"
                            />
                        </div>
                    </div>
                </div>

                {/* NEWS */}
                <h2 className="fs-4">Tennis rating guide:</h2>
                <div className="row">
                    <div className="col">
                        <div className="p-2">
                            <div className="card rounded-3">
                                <div className="card-body">
                                    <h5 className="card-title">ATP Ranking:</h5>
                                    <span className="card-text">A player’s ranking is determined by their performance in Grand Slams, ATP Tour and Challenger Tournaments, 25K ITF tournaments, and 15K ITF Tournaments. The player’s ranking is based on their best 16 results during a calendar year. The points for a tournament will count towards a player’s ranking for a total of 52 weeks following the result.</span>
                                    
                                    <br />
                                    <br />


                                    <div>
                                        <a href="#">See ATP Point allocation here</a>
                                        <BoxArrowUpRight className="ms-2" size={12} color="blue" />
                                    </div>

                                    <br />
                                    

                                    <h5 className="card-title">ELO Ranking:</h5>
                                    <span className="card-text">The principle behind any Elo system is that each player’s rating is an estimate of their strength, and each match (or tournament) allows us to update that estimate. If a player wins, her rating goes up; if she loses, it goes down.

Where Elo excels is in determining the amount by which a rating should increase or decrease. There are two main variables that are taken into account: How many matches are already in the system (that is, how much confidence we have in the pre-match rating), and the quality of the opponent.</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center px-2 py-2">
                            icons here
                        </div>
                        <span className="">
                            If you enjoy the Live Tennis ELO Ratings website and would like to help it, please think about making a small donation to support our project. Thanks!
                        </span>

                    </div>
                </div>


            </div>

        </>
    )
}