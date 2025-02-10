import React from 'react';
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useCart } from './CartContext';

const Navbar = ({ onCartToggle }) => {
  const { cart } = useCart(); // Utilisez le contexte pour accéder au panier

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
        <button
          onClick={onCartToggle} // Utilisez la prop `onCartToggle` pour ouvrir le panier
          className="relative p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ShoppingCartIcon className="h-6 w-6 text-white" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;