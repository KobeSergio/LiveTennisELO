import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";

export function Filter() {
  return (
    <Dropdown className="border-0 dropdown rounded-3">
      <Dropdown.Toggle
        className="o40"
        variant="white"
        id="dropdown-basic"
        size="sm"
      >
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
      <Dropdown.Toggle
        className="o40"
        variant="white"
        id="dropdown-basic"
        size="sm"
      >
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

export function DateDropdown(choices) {
  const { doc_date } = useParams();
  var choicesCopy = [...choices.choices];
  choicesCopy = choicesCopy.reverse();
  return (
    <Dropdown className="border-0 dropdown rounded-3">
      <Dropdown.Toggle
        className="o40"
        variant="white"
        id="dropdown-basic"
        size="sm"
      >
        {doc_date.substring(0, 4) +
          "/" +
          doc_date.substring(4, 6) +
          "/" +
          doc_date.substring(6, 8)}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {choicesCopy.map((choice) => (
          <Dropdown.Item href={choice}>
            {choice.substring(0, 4) +
              "/" +
              choice.substring(4, 6) +
              "/" +
              choice.substring(6, 8)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export function RowsDropdown() {
  return (
    <Dropdown className="border-0 dropdown rounded-3">
      <Dropdown.Toggle
        className="o40"
        variant="white"
        id="dropdown-basic"
        size="sm"
      >
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
