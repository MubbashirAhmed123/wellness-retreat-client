import React from 'react'

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleClick = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_,index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
