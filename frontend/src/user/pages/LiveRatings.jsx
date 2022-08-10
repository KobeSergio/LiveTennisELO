import { YearDropdown } from "../../components/Dropdown";
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { RowsDropdown, DateDropdown } from "../../components/Dropdown";
export default function Charts() {
    return (
        <>
            <h1>Welcome to Live Tennis ELO Ratings!</h1>
            <div>
                <p>Your go-to place for men's professional tennis statistics! Track your favorite player's ratings with the help of graphs and compare them to their rivals.</p>
                <div className="input-group pt-3 pb-3 mx-3">
                    <div className="me-4">
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
            </div>

        </>
    );
}
