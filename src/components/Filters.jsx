import React from "react";

const Filters = ({ setCategory }) => {
  const categories = ["Todas", "Historia", "Política", "Autoayuda", "Tecnología"];

  return (
    <div className="flex justify-center space-x-4 my-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCategory(category)}
          className="px-4 py-2 border rounded-lg text-sm text-white bg-gray-400  hover:bg-gray-500 transition-colors duration-300"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filters;
