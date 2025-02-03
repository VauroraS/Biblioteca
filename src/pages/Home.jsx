import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import BookList from "../components/BookList";
import fondoBiblioteca from "../assets/fondo_biblioteca.jpg";

const Home = () => {
  const [category, setCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState(null); // Inicialmente null

  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // No realizar la búsqueda si el campo está vacío

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/libros?search=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error("Error al buscar libros");
      }

      const data = await response.json();
      setBooks(data.length > 0 ? data : []); // Si no hay resultados, asignar un array vacío
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setBooks([]); // En caso de error, asegurarse de que books no sea null
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="min-h-screen flex flex-col">
        {/* Imagen destacada */}
        <div className="relative w-full h-20 sm:h-40 overflow-hidden mb-6">
          <img
            src={fondoBiblioteca}
            alt="Fondo de biblioteca"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-2xl sm:text-4xl font-bold">
              Biblioteca
            </h1>
          </div>
        </div>

        {/* Campo de búsqueda */}
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap items-center gap-4 mb-6 sm:gap-2 p-6"
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar un libro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Buscar
          </button>
        </form>

        {/* Mostrar resultados solo si hay libros */}
        {books !== null && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {books.length > 0 ? (
              books.map((libro) => (
                <div key={libro.id} className="border p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-2">{libro.titulo}</h2>
                  <p className="text-gray-600 mb-2">Autor: {libro.autor}</p>
                  <p className="text-gray-600 mb-2">
                    Editorial: {libro.editorial}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Año: {libro.anio_publicacion}
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Reservar
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No se encontraron libros para "{searchQuery}"
              </p>
            )}
          </div>
        )}

        {/* Filtros por categoría */}
        <Filters setCategory={setCategory} />

        {/* Lista de libros */}
        <div className="mt-6 p-6">
          <BookList category={category} currentPage={currentPage} />
        </div>
      </main>
    </div>
  );
};

export default Home;


