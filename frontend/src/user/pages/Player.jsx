import { PlayerChart } from "../components/Charts/PlayerChart";
import { PlayerMatches } from "../components/Tables/PlayerMatches";


export default function Player() {
    return (
        <>
            <div className="p-5">
                <h1>Player Profile</h1>

                <div className="rounded-3 bg-white">
                    <div className="container-fluid h-100 rounded-3 shadow p-5 mb-5">
                        <div className="row h-100 py-3">
                            <aside className="col-sm-2">
                                <div className="mb-3">
                                    <img className="player_pfpic bg-transparent border-0 img-responsive img-thumbnail" id='player-pfpic' src={require('../img/player_sample.png')}></img>
                                    <div className='pt-1 gc-100' id="player-id">RS0010</div>
                                    <div><h1 className="fs-3 fw-bold" id="player-name">Novak Djokovic</h1></div>
                                </div>
                            </aside>

                            <main class="col ms-3">
                                <div className="lh-lg">
                                    <div><h1 className="fs-5 fw-bold pb-2">Player Information</h1></div>
                                    <div className="row mb-4">


                                        <div className='col-sm-2'> {/* age, country, bithplace, height weight, socials */}
                                            <div>Age:</div>
                                            <div>Country:</div>
                                            <div>Birthplace:</div>
                                            <div>Height:</div>
                                            <div>Weight:</div>
                                            <div>Socials:</div>
                                        </div>
                                        <div className='col-sm-2'> {/* age, country, bithplace, height weight, socials */}
                                            <div className="text-dark" id="age">36</div>
                                            <div className="text-dark" id="country">Serbia</div>
                                            <div className="text-dark" id="birthplace">Belgrade, Serbia</div>
                                            <div className="text-dark"><span className="text-dark" id="height">188</span> cm</div>
                                            <div className="text-dark"><span className="text-dark" id="weight">77</span> kg</div>
                                            <div className="text-dark" id="social">icons here</div>
                                        </div>


                                        <div className='col-sm-2'> {/* plays, backhand, surface, website, last active */}
                                            <div>Plays:</div>
                                            <div>Backhand:</div>
                                            <div>Favorite Surface:</div>
                                            <div>Website:</div>
                                            <div>Last Active:</div>
                                        </div>
                                        <div className='col-sm-2'> {/* plays, backhand, surface, website, last active */}
                                            <div className="text-dark" id="plays">Right-handed</div>
                                            <div className="text-dark" id="backhand">Two-handed</div>
                                            <div className="text-dark gc-100" id="surface">Grass</div>
                                            <div className="text-dark" id="website">href here</div>
                                            <div className="text-dark">22-05-2022</div>
                                        </div>
                                    </div>



                                    <div>
                                        <h1 className="fs-5 fw-bold pb-2">ELO Rankings</h1>
                                    </div>


                                    <div className="row">


                                        <div className='row mb-3'>
                                            <div className='col-sm-2'> {/* overall rank */}
                                                <div>Overall Rank:</div>
                                                <div>Peak Overall Rank:</div>
                                                <div>Peak Overall Rating:</div>
                                            </div>
                                            <div className='col-sm-2'>
                                                <div id="overall">2 (2367)</div>
                                                <div id="peak_rank">1 (21-03-2011)</div>
                                                <div id="peak_rating">2629 (01-02-2016)</div>
                                            </div>



                                            <div className='col-sm-2'> {/* clay rank */}
                                                <div className="clay-text">Clay Rank:</div>
                                                <div className="clay-text">Peak Clay Rank:</div>
                                                <div className="clay-text">Peak Clay Rating:</div>
                                            </div>
                                            <div className='col-sm-2'>
                                                <div className="clay-text" id="clay">2 (2367)</div>
                                                <div className="clay-text" id="peak_rank">1 (21-03-2011)</div>
                                                <div className="clay-text" id="peak_rating">2629 (01-02-2016)</div>
                                            </div>
                                        </div>


                                        <div className='row mb-3'>
                                            <div className='col-sm-2'> {/* hard rank */}
                                                <div className="hard-text">Hard Rank:</div>
                                                <div className="hard-text">Peak Hard Rank:</div>
                                                <div className="hard-text">Peak Hard Rating:</div>
                                            </div>
                                            <div className='col-sm-2'>
                                                <div className="hard-text" id="hard">2 (2367)</div>
                                                <div className="hard-text" id="hard_rank">1 (21-03-2011)</div>
                                                <div className="hard-text" id="hard_rating">2629 (01-02-2016)</div>
                                            </div>


                                            <div className='col-sm-2'> {/* grass rank */}
                                                <div className="grass-text">Grass Rank:</div>
                                                <div className="grass-text">Peak Grass Rank:</div>
                                                <div className="grass-text">Peak Grass Rating:</div>
                                            </div>
                                            <div className='col-sm-2'>
                                                <div className="grass-text" id="grass">2 (2367)</div>
                                                <div className="grass-text" id="grass_rank">1 (21-03-2011)</div>
                                                <div className="grass-text" id="grass_rating">2629 (01-02-2016)</div>
                                            </div>
                                        </div>


                                        <div className='row'>
                                            <div className='col-sm-2'> {/* atp points */}
                                                <div>ATP Points:</div>
                                                <div>Peak ATP Points:</div>
                                            </div>
                                            <div className='col-sm-2'>
                                                <div id="atp">6700</div>
                                                <div id="peak_atp">19,950</div>
                                            </div>

                                        </div>
                                        <div className="col pt-4">
                                            <button type="button" className="ms-4 px-2 btn btn-green btn-sm float-end" style={{ fontSize: "18px", borderWidth: "0px", width: "150px", height: "40px", fontWeight: "600" }}>Edit Content</button>
                                        </div>

                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>

                <PlayerChart />
                <PlayerMatches />

            </div>

        </>
    )
}