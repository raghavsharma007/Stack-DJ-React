import React from 'react'

function Pagination({dataPerPage, totalData, paginate}) {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalData/dataPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className="flex">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginate(number)} className="bg-blue-600 rounded-sm px-2 mx-1" href="!#">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination
