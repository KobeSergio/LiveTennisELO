import { YearDropdown, DateDropdown } from "../Dropdown";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import "../../../css/admin/borders.css";

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
                                <td contenteditable='true' className="table-surface-elo" id="overall">
                                    <span className="table-border">3161</span>
                                </td>
                                <td contenteditable='true' className="table-surface-elo" id="hard">
                                    <span className="table-border hard-text">3076</span>
                                </td>
                                <td contenteditable='true' className="table-surface-elo" id="clay">
                                    <span className="table-border clay-text">2919</span>
                                </td>
                                <td contenteditable='true' className="table-surface-elo" id="grass">
                                    <span className="table-border grass-text">2824</span>
                                </td>
                                <td contenteditable='true' className="table-surface-elo" id="atp">
                                    <span className="table-border">3151</span>
                                </td>
                                <td contenteditable='true' id="lactive">07/2017</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}