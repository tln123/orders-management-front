import React from 'react';
import './Pagination.scss'


const Pagination = ({ numberOfOrders, currentPage, handleClick }: { numberOfOrders: number, currentPage: number, handleClick: (page: number) => void }) => {

    const ordersPerPage: number = 20;
    const numberOfPages: number = Math.ceil(numberOfOrders / ordersPerPage);

    let pageNumbers: number[];
    if (numberOfPages <= 5) {
        pageNumbers = Array(numberOfPages).fill(1).map((number, index) => number + index);
    } else {
        pageNumbers =
            (currentPage <= 3)
                ?
                [1, 2, 3, 4, 5]
                :
                (currentPage <= (numberOfPages - 2))
                    ?
                    [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
                    :
                    [numberOfPages - 4, numberOfPages - 3, numberOfPages - 2, numberOfPages - 1, numberOfPages];
    }


    return (
        <div className="pagination">

            <ul>
                {/* prev button */}
                <li
                    className={`${pageNumbers[0] === currentPage && "disabled"}`}
                    onClick={handleClick.bind(null, currentPage - 1)}
                >
                    Prev
                </li>

                {/* numbers buttons */}
                {
                pageNumbers.map((page) => (
                    <li
                        key={page}
                        className={`${currentPage === page && "active"}`}
                        onClick={handleClick.bind(null, page)}
                    >
                        {page}
                    </li>
                ))
                }

                {/* next button */}
                <li
                    className={`${pageNumbers.reverse()[0] === currentPage && "disabled"}`}
                    onClick={handleClick.bind(null, currentPage + 1)}
                >
                    Next
                </li>
                
            </ul>

        </div>
    );
}

export default Pagination;