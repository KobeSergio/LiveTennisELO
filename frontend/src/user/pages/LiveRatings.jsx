import { YearDropdown } from "../../components/Dropdown";
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { RowsDropdown, DateDropdown } from "../../components/Dropdown";
import bg_img from "../img/bg-liveratings.png";

export default function Charts() {
    return (
        <>

            <div className="liverating-bg" style={{ backgroundImage: `url(${bg_img})` }}>
                <div className="px-5 py-4">
                    <div className="p-2">
                        <h1 className="fs-3">Welcome to Live Tennis ELO Ratings!</h1>
                        <p>Your go-to place for men's professional tennis statistics! Track your favorite player's ratings with the help of graphs and compare them to their rivals.</p>
                    </div>

                    <div>
                        <div className="input-group pt-3 pb-3">
                            <div className="input-group">
                                <div className="me-4">
                                    <YearDropdown />
                                </div>
                                <span className="input-group-button">
                                    <button
                                        className="btn btn-white border-0 dropdown rounded-3 me-2"
                                        type="submit"
                                    >
                                        <ChevronLeft color="gray" style={{ fontSize: "18px" }} />
                                    </button>
                                </span>
                                <DateDropdown />
                                <span className="input-group-button">
                                    <button
                                        className="btn btn-white border-0 dropdown rounded-3 ms-2 me-4"
                                        type="submit"
                                    >
                                        <ChevronRight color="gray" style={{ fontSize: "18px" }} />
                                    </button>
                                </span>
                                <RowsDropdown />
                            </div>
                        </div>
                    </div>
                    <div className="w-50">
                            <div className="row">
                                <div className="col">
                                    <nav>
                                        <div className="nav nav-tabs pb-1" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Overall</a>
                                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Hard</a>
                                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Clay</a>
                                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Grass</a>
                                            <a className="nav-item nav-link me-5" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">ATP</a>
                                            

                                            {/* SEARCH BY COUNTRY */}
                                            <span className="">
                                                <DateDropdown />
                                            </span> 

                                            {/* SHOW INACTIVE */}

                                            {/* SEARCH IN RECORD */}
                                        </div>
                                    </nav>
                                    <div class="tab-content" id="nav-tabContent">
                                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                            <table class="table" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Project Name</th>
                                                        <th>Employer</th>
                                                        <th>Awards</th>
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
                </div>

                <div>
                        
                </div>
            </div>

        </>
    );
}
