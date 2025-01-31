import React from "react";

const Pagination = ({ currentPage, setCurrentPage, totalBooks, booksPerPage }) => {
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  // Calcular si hay más libros para mostrar en la siguiente página
  const isNextDisabled = currentPage * booksPerPage >= totalBooks;

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-gray-700">Página {currentPage}</span>
      <button
        onClick={handleNext}
        disabled={isNextDisabled}  // Deshabilitar si no hay más libros
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
