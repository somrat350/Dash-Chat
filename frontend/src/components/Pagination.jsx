import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-2 bg-white border border-gray-300 shadow-sm rounded-full p-1">
        
        {/* prev Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 rounded-full border border-transparent hover:bg-gray-100 disabled:opacity-40 text-gray-700 transition"
        >
          Prev
        </button>

        {/* page numbers */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-4 py-2 rounded-full border border-transparent transition ${
              currentPage === i + 1
                ? "bg-primary text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 rounded-full border border-transparent hover:bg-gray-100 disabled:opacity-40 text-gray-700 transition"
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Pagination;