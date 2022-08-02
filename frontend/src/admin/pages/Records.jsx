import { ChevronLeft, ChevronRight, Download, Search, TrashFill } from "react-bootstrap-icons";
import { YearDropdown, DateDropdown, RowsDropdown } from '../components/Dropdown';
import Pagination from '../components/Pagination';
import { SearchRecords } from "../components/Search";
import { SurfaceLegend } from "../components/Legend";

function Records() {
    return (
        <>
            <div>
                <h1 className="fw-bold fs-4">Tennis Records</h1>
            </div>


            {/* main search + filters */}
            <div className="input-group pt-3 pb-3 mx-3">
                <div className="me-4">
                    <div className="input-group">
                        <div className="me-4">
                            <YearDropdown />
                        </div>

                        <span className="input-group-button">
                            <button className="btn btn-white border-0 dropdown rounded-3 me-2" type="submit">
                                <ChevronLeft color="gray" style={{fontSize: "18px"}} />
                            </button>
                        </span>
                        <DateDropdown />
                        <span className="input-group-button">
                            <button className="btn btn-white border-0 dropdown rounded-3 ms-2" type="submit">
                                <ChevronRight color="gray" style={{fontSize: "18px"}} />
                            </button>
                        </span>

                    </div>
                </div>

                <SearchRecords />

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
                        
                        <SurfaceLegend />

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
                                <th scope="col">Clay</th>
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
                                <td className="table-clay" id="clay">2919</td>
                                <td className="table-grass" id="grass">2824</td>
                                <td id="atp">3151</td>
                                <td id="lactive">01/07/2017</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <a href="" className="color-1">Edit Record</a>
                    </div>
                    <div className="ms-auto">
                        <Pagination />
                    </div>

                </div>
            </div>


        </>

    );
}

export default Records;
