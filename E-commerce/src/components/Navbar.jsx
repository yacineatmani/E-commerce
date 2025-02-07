import React, { useState } from 'react';
import { ShoppingCartIcon } from "@heroicons/react/outline";

const Navbar = ({ onCartToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour gérer la recherche
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-50 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-white">eShop</h1>
      </div>
      <ul className="flex space-x-6 text-white">
        <li className="hover:text-gray-300 cursor-pointer">Home</li>
        <li className="hover:text-gray-300 cursor-pointer">Products</li>
        <li className="hover:text-gray-300 cursor-pointer">Contact</li>
        <li className="hover:text-gray-300 cursor-pointer">FAQ</li>
      </ul>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className="border p-1 rounded bg-white text-black"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={onCartToggle}>
          <ShoppingCartIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
