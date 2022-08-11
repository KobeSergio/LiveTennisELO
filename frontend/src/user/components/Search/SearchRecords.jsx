import { Search } from 'react-bootstrap-icons';

export default function SearchRecords() {
    return (
        <div className="input-group" style={{ width: "80%" }}>
            <input className="form-control border-0 dropdown rounded-3" type="text" placeholder="Search in Record" aria-label="Search in Record" />
            <span className="input-group-button">
                <button className="btn btn-green search-btn px-3 py-1" type="submit">
                    <Search color="white" className="fs-7" />
                </button>
            </span>
        </div>
    )
}