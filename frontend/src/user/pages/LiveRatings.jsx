import { YearDropdown } from "../../components/Dropdown";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { RowsDropdown, DateDropdown } from "../../components/Dropdown";
import bg_img from "../img/bg-liveratings.png";
import SearchRecords from "../components/Search/SearchRecords";
import SearchCountry from "../components/Search/SearchCountry";
import ShowInactive from "../components/Toggle/ShowInactive";
import ReactCountryFlag from "react-country-flag";
import { PositiveElo, NegativeElo } from "../components/Labels/ELO.jsx";
import LiveRatingsTable from "../components/Tables/LiveRatingsTable";

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
                    
                    <LiveRatingsTable />

                </div>

                <div>

                </div>
            </div>

        </>
    );
}
