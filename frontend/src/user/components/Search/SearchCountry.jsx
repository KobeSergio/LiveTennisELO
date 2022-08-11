import Dropdown from 'react-bootstrap/Dropdown';

export default function SearchCountry() {
    return (
        <Dropdown className="border rounded-3">
            <Dropdown.Toggle className="o40" variant="white" id="dropdown-basic" size="sm">
                Search by Country
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/2021">Filter by</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}