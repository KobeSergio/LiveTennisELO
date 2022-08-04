import { YearDropdown, DateDropdown } from "../Dropdown";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

function Filters() {
    return (
        <>
            <div className="input-group ms-auto pb-3">
                <div className="me-4">
                    <div className="input-group">
                        <div className="me-4">
                            <YearDropdown />
                        </div>

                        <span className="input-group-button">
                            <button className="btn btn-white border-0 dropdown rounded-3 me-2" type="submit">
                                <ChevronLeft color="gray" style={{ fontSize: "18px" }} />
                            </button>
                        </span>
                        <DateDropdown />
                        <span className="input-group-button">
                            <button className="btn btn-white border-0 dropdown rounded-3 ms-2" type="submit">
                                <ChevronRight color="gray" style={{ fontSize: "18px" }} />
                            </button>
                        </span>

                    </div>
                </div>

            </div>
        </>
    )
}

export function EditRecordTable() {
    return (
        <>
            <Filters />
            <div className="py-3 bg-white shadow rounded" style={{ borderRadius: "10px 10px 0 0" }}>
                <div className="input-group">
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
                                <td id="name">Novak Djokovic</td>
                                <td contenteditable='true'id="overall">3161</td>
                                <td contenteditable='true' className="" id="hard">3076</td>
                                <td contenteditable='true' className="" id="clay">2919</td>
                                <td contenteditable='true' className="" id="grass">2824</td>
                                <td contenteditable='true' id="atp">3151</td>
                                <td contenteditable='true' id="lactive">01/07/2017</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}