import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

import { useEffect, useState } from "react";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function RecordChoices(choices) {
  const { doc_date } = useParams();
  var choicesCopy = [...choices.choices];
  choicesCopy = choicesCopy.reverse();

  var years = []; 
  choicesCopy.forEach((choice) =>
    years.push(choice.toString().substring(0, 4))
  );
  years = years.filter(onlyUnique);

  const [year, setyear] = useState(doc_date.substring(0, 4));

  const recordIndex = choicesCopy.findIndex((x) => x == doc_date);

  console.log(recordIndex)
  return (
    <div className="input-group">
      <div className="me-4">
        <Dropdown className="border border-dark dropdown rounded-3">
          <Dropdown.Toggle
            className="o40"
            variant="white"
            id="dropdown-basic"
            size="sm"
          >
            {year}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {years.map((y) => (
              <Dropdown.Item onClick={() => setyear(y)}>{y}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <span className="input-group-button">
        <a href={choicesCopy[recordIndex - 1]}>
          <button className="btn btn-white border-0 dropdown rounded-3 me-2">
            <ChevronLeft color="gray" style={{ fontSize: "18px" }} />
          </button>
        </a>
      </span>
      <Dropdown className="border border-dark dropdown rounded-3">
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
          {choicesCopy.map((choice) =>
            choice.toString().substring(0, 4) === year ? (
              <Dropdown.Item href={choice.toString()}>
                {choice.toString().substring(0, 4) +
                  "/" +
                  choice.toString().substring(4, 6) +
                  "/" +
                  choice.toString().substring(6, 8)}
              </Dropdown.Item>
            ) : (
              console.log()
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
      <span className="input-group-button">
        <a href={choicesCopy[recordIndex + 1]}>
          <button className="btn btn-white border-0 dropdown rounded-3 me-2">
            <ChevronRight color="gray" style={{ fontSize: "18px" }} />
          </button>
        </a>
      </span>
    </div>
  );
}
