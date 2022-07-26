import { Search } from "react-bootstrap-icons"

export function SearchRecords() {
    return (
        <div className="input-group" style={{ width: "30%" }}>
            <input className="form-control border-0 dropdown rounded-3" type="text" placeholder="Search Record" aria-label="Search Record" />
            <span className="input-group-button">
                <button className="btn btn-green search-btn px-3 py-1" type="submit">
                    <Search color="white" className="fs-7" />
                </button>
            </span>
        </div>
    )
}

export function SearchPlayers() {
    return (
        <div className="input-group" style={{ width: "30%" }}>
            <input className="form-control border-0 dropdown rounded-3" type="text" placeholder="Search Player" aria-label="Search Player" />
            <span className="input-group-button">
                <button className="btn btn-green search-btn px-3 py-1" type="submit">
                    <Search color="white" className="fs-7" />
                </button>
            </span>
        </div>
    )
}