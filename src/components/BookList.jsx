import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import Pagination from "./Pagination"; // Asegúrate de importar el componente de paginación

const BookList = ({ category }) => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual

  const booksPerPage = 6; // Número de libros por página

  useEffect(() => {
    const fetchLibros = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/libros");
        const librosFiltrados =
          category === "Todas"
            ? response.data
            : response.data.filter((libro) => libro.categoria === category);
        setLibros(librosFiltrados);
        setCurrentPage(1); // Reiniciar la paginación al cambiar la categoría
      } catch (err) {
        setError("No se pudieron cargar los libros.");
      } finally {
        setLoading(false);
      }
    };

    fetchLibros();
  }, [category]);

  // Calcular los índices de los libros a mostrar
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = libros.slice(indexOfFirstBook, indexOfLastBook);

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (libros.length === 0) return <p>No hay libros disponibles.</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBooks.map((libro) => (
          <BookCard key={libro.id_libros} libro={libro} />
        ))}
      </div>

      {/* Componente de paginación */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalBooks={libros.length} // Total de libros cargados
        booksPerPage={booksPerPage}
      />
    </div>
  );
};

export default BookList;



