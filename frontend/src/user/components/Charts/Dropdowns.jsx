import Dropdown from 'react-bootstrap/Dropdown';

export function SearchPlayersDropdown() {
    return (
        <>
            <Dropdown className="border-0 w-75 dropdown rounded-3">
                <Dropdown.Toggle
                    className="o40 dropdown-toggle w-100"
                    variant="white"
                    id="dropdown-basic"
                    size="sm"
                >
                    Custom
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/2021">1</Dropdown.Item>
                    <Dropdown.Item href="#/2020">2</Dropdown.Item>
                    <Dropdown.Item href="#/2019">3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export function RankTypeDropdown() {
    return (
        <>
            <Dropdown className="border-0 w-75 dropdown rounded-3">
                <Dropdown.Toggle
                    className="o40 w-100"
                    variant="white"
                    id="dropdown-basic"
                    size="sm"
                >
                    ELO Ratings
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/2021">1</Dropdown.Item>
                    <Dropdown.Item href="#/2020">2</Dropdown.Item>
                    <Dropdown.Item href="#/2019">3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
