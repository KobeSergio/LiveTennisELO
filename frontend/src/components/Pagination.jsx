export default function Pagination() {
    return (
        <nav>
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">&laquo; &nbsp; Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">...</a></li>
                <li className="page-item"><a className="page-link" href="#">188</a></li>
                <li className="page-item"><a className="page-link" href="#">Next &nbsp; &raquo;</a></li>
            </ul>
        </nav>
    )
}