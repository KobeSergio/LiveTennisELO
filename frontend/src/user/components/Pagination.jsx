import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { useState } from "react";
export default function Pagination({ DataPerPage, totalData, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / DataPerPage); i++) {
    pageNumbers.push(i);
  }
 
  const [selected, setSelected] = useState(1);
  return (
    <nav className="pagination-outer">
      <ul className="pagination">
        {selected != 1 ? (
          <>
            <li className={"page-item"}>
              <a
                onClick={() => {
                  paginate(selected - 1);
                  setSelected(selected - 1);
                }}
                className="page-link"
                href="#/"
              >
                Previous
              </a>
            </li>
          </>
        ) : (
          <></>
        )}

        {pageNumbers.map((number) =>
          number <= selected + 3 && number >= selected - 3 ? (
            <>
              <li
                className={
                  selected === number ? "page-item active" : "page-item"
                }
              >
                <a
                  onClick={() => {
                    paginate(number);
                    setSelected(number);
                  }}
                  className="page-link"
                  href="#/"
                >
                  {number}
                </a>
              </li>
            </>
          ) : (
            <></>
          )
        )}

        {selected != pageNumbers.length ? (
          <>
            <li className={"page-item"}>
              <a
                onClick={() => {
                  paginate(selected + 1);
                  setSelected(selected + 1);
                }}
                className="page-link"
                href="#/"
              >
                Next
              </a>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
}
