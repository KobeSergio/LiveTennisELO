import Dropdown from 'react-bootstrap/Dropdown';

export function Filter() {
    return (
        <Dropdown className="border-0 dropdown rounded-3">
            <Dropdown.Toggle className="o40" variant="white" id="dropdown-basic" size="sm">
                Filter by
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/2021">Filter by</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export function YearDropdown() {
    return (
        <Dropdown className="border-0 dropdown rounded-3">
            <Dropdown.Toggle className="o40" variant="white" id="dropdown-basic" size="sm">
                2022
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/2021">2021</Dropdown.Item>
                <Dropdown.Item href="#/2020">2020</Dropdown.Item>
                <Dropdown.Item href="#/2019">2019</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export function DateDropdown() {
    return (
        <Dropdown className="border-0 dropdown rounded-3">
            <Dropdown.Toggle className="o40" variant="white" id="dropdown-basic" size="sm">
                27/06/2022
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/2022/27/06">2022/27/06</Dropdown.Item>
                <Dropdown.Item href="#/2022/26/06">2022/26/06</Dropdown.Item>
                <Dropdown.Item href="#/2022/25/06">2022/25/06</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export function RowsDropdown() {
    return (
        <Dropdown className="border-0 dropdown rounded-3">
            <Dropdown.Toggle className="o40" variant="white" id="dropdown-basic" size="sm">
                10 per page
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/">15 per page</Dropdown.Item>
                <Dropdown.Item href="#/">20 per page</Dropdown.Item>
                <Dropdown.Item href="#/">25 per page</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export function MatchFilter() {
    return ( 
    <Dropdown className="border-0 dropdown rounded-3">
        <Dropdown.Toggle className="o40" variant="white" id="dropdown-basic" size="sm">
            All Surfaces
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/">Hard</Dropdown.Item>
            <Dropdown.Item href="#/">Clay</Dropdown.Item>
            <Dropdown.Item href="#/">Grass</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    )
}