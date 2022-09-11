import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { useState } from "react";
export default function Pagination({ DataPerPage, totalData, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / DataPerPage); i++) {
    pageNumbers.push(i);
  }

  const [selected, setSelected] = useState(0);
  return (
    <nav className="pagination-outer">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={selected === number ? "page-item active" : "page-item"}
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
        ))}
      </ul>
    </nav>
  );
}
