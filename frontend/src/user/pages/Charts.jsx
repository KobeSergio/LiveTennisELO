import bg_img from "../img/bg-charts.png";

import Graph from "../components/Charts/Graph";
import Footer from "../components/Footer/Footer";
import { SearchPlayersDropdown, RankTypeDropdown } from "../components/Charts/Dropdowns";
import { X, CaretDownFill, Plus, Pencil } from 'react-bootstrap-icons';
import Button from "react-bootstrap/esm/Button";

export default function Charts() {
    return (
        <>

            <div className="charts-bg" style={{ backgroundImage: `url(${bg_img})` }}>
                <div className="px-5 py-4">
                    <div className="p-2 w-50">
                        <h1 className="fs-3">Chart Comparison</h1>
                        <p>You can compare players’ ELO Rating and ranking charts by clicking "Add Player".</p>
                    </div>

                    <div className="row">
                        <div className="w-25 me-4">
                            {/* Select Player */}
                            <div className="d-flex">
                                <span className="me-2 col-form-label w-25">Search Players:</span>
                                <SearchPlayersDropdown />
                            </div>

                            {/* Add Players */}
                            <div className="d-grid my-3 gap-2">

                                <div className='d-flex gap-2'>
                                    <div className="card border-0 w-50">
                                        <div className="card-header rounded-top-3 gc-100-bg border-0 h-25">
                                            <div className="d-flex align-items-center h-100">
                                                <a className="ms-auto float-end" href="#">
                                                    <X className="align-items-center" color="white" size={18} />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="card-body px-3  py-2">
                                            <h5 className="card-title">Novak Djokovic</h5>
                                            <p className="card-text fw-normal">Serbia, 1987 <a className='float-end' href="#"><CaretDownFill size={12} /></a></p>
                                        </div>
                                    </div>

                                    {/* Add Player Button */}
                                    <Button className="card border-0 w-50 rounded-3 shadow h-50">
                                        <span className="mx-auto my-auto gc-100">
                                            <Plus color="green" size={18} />
                                            Add Player
                                        </span>
                                    </Button>

                                    {/* Uncomment for Rafael Nadal */}
                                    {/* <div className="card border-0 w-50">
                                        <div className="card-header rounded-top-3 gc-100-bg border-0 h-25">
                                                    <div className="d-flex align-items-center h-100">
                                                        <a className="ms-auto float-end" href="#">
                                                                <X className="align-items-center" color="white" size={18}/>
                                                        </a>
                                                    </div>
                                        </div>
                                        
                                        <div className="card-body px-3  py-2">
                                            <h5 className="card-title">Rafael Nadal</h5>
                                            <p className="card-text fw-normal">Spain, 1987 <a className='float-end' href="#"><CaretDownFill size={12}/></a></p>
                                        </div>
                                    </div> */}
                                </div>

                            </div>

                            {/* Select Rank Type */}
                            <div className="d-flex mb-4">
                                <span className="me-2 col-form-label w-25">Rank Type:</span>
                                <RankTypeDropdown />
                            </div>

                            {/* Select Time Span */}
                            <div className="d-flex mb-4 flex-column align-items-start">

                                <div className="d-flex">

                                    <div className="d-flex-inline m-auto w-25 align-items-start">
                                        <span className="me-2 col-form-label">Time Span:</span>
                                    </div>

                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center me-auto">
                                            <div className="form-group ms-2">
                                                <label className="form-text">From:</label>
                                                <input type="text" className="form-control border-0 rounded-4 shadow w-100" placeholder="" />
                                            </div>
                                            <span className="mx-2">—</span>
                                            <div className="form-group">
                                                <label className="form-text">To:</label>
                                                <input type="text" className="form-control border-0 rounded-4 shadow w-100" placeholder="" />
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-start">
                                            <span className="form-text fw-normal">
                                                or show last <a href="#">one</a>, <a href="#">two</a>, <a href="#">five</a> or <a href="#">ten</a> years, or <a href="#">full</a> careers, or <a href="#">synchrony</a>.
                                            </span>
                                        </div>
                                    </div>


                                </div>

                            </div>

                            {/* Select Age Span */}
                            <div className="d-flex mb-4 flex-column align-items-start">

                                <div className="d-flex">

                                    <div className="d-flex-inline m-auto w-25 align-items-start">
                                        <span className="me-2 col-form-label">Age Span:</span>
                                    </div>

                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center me-auto">
                                            <div className="form-group ms-2">
                                                <label className="form-text">From:</label>
                                                <input type="text" className="form-control border-0 rounded-4 shadow w-100" placeholder="" />
                                            </div>
                                            <span className="mx-2">—</span>
                                            <div className="form-group">
                                                <label className="form-text">To:</label>
                                                <input type="text" className="form-control border-0 rounded-4 shadow w-100" placeholder="" />
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-start">
                                            <span className="form-text fw-normal">
                                                or show <a href="#">all ages</a>, or <a href="#">age equivalent only</a>.
                                            </span>
                                        </div>
                                    </div>


                                </div>

                            </div>

                            {/* Draw Chart Button */}
                            <Button className="d-flex-inline align-items-center gc-100-button w-100">
                                <Pencil color="white" className="me-2" size={18}/> Draw Chart
                            </Button>


                        </div>
                        <div className="col w-50">
                            {/* Player Chart */}
                            <Graph />
                            {/* FILTER */}
                        </div>
                    </div>
                </div>

                <Footer />

            </div>

        </>
    );
}

