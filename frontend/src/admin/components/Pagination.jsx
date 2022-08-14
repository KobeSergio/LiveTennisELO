import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-outer">
      <ul className="pagination"> 
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link" href="#">
              {number}
            </a>
          </li>
        ))} 
      </ul>
    </nav>
  );
}
