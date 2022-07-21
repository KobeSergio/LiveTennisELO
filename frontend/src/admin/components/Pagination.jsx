import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

export default function Pagination() {
    return (
        <nav className='pagination-outer'>
            <ul className="pagination">
                <li className='page-item'>
                    <a href="" className='pagination-button'>
                        <ChevronLeft />
                        Previous
                    </a>
                </li>

                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">...</a></li>
                <li className="page-item"><a className="page-link" href="#">188</a></li>

                <li className='page-item'>
                    <a href="" className='pagination-button'>
                        Next
                        <ChevronRight />

                    </a>
                </li>
            </ul>
        </nav>
    )
}