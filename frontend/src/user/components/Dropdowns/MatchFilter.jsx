import Dropdown from "react-bootstrap/Dropdown";

export function MatchFilter() {
    return (
      <Dropdown className="border-0 dropdown rounded-3">
        <Dropdown.Toggle
          className="o40"
          variant="white"
          id="dropdown-basic"
          size="sm"
        >
          All Surfaces
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item href="#/">Hard</Dropdown.Item>
          <Dropdown.Item href="#/">Clay</Dropdown.Item>
          <Dropdown.Item href="#/">Grass</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }