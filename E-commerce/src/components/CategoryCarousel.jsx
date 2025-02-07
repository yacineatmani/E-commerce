// src/components/CategoryCarousel.jsx
import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext'; // Importez le hook useCart
import './carousel-categorie.css';

const CategoryCarousel = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart(); // Utilisez le hook pour ajouter au panier

  useEffect(() => {
    fetch('/data.json')
    .then(response => response.json())
    .then(data => {
      console.log("✅ Produits chargés :", data.products); // Debugging
      setProducts(data.products.filter(product => product.category === category));
    })
    .catch(error => console.error('❌ Erreur de chargement des produits:', error));
  
  }, [category]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 uppercase tracking-wider text-gray-800">
        {category} Collection
      </h2>
      
      <div className="relative w-full max-w-7xl mx-auto flex items-center">
        {/* Boutons de navigation précédent/suivant */}
        
        <div className="w-full overflow-hidden">
          <div className="flex justify-center items-center space-x-4">
            {products.map((product, index) => {
              const isCenter = index === currentIndex;
              const isAdjacent = 
                index === (currentIndex - 1 + products.length) % products.length ||
                index === (currentIndex + 1) % products.length;

              return (
                <div
                  key={product.id}
                  className={`
                    transition-all duration-500 ease-in-out 
                    transform origin-center
                    ${isCenter 
                      ? "scale-100 w-96 z-20" 
                      : isAdjacent
                      ? "scale-75 w-72 opacity-70 z-10"
                      : "scale-50 w-48 opacity-40 hidden"
                    }
                  `}
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="h-80 overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-blue-600">
                          {product.price.toFixed(2)} €
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                          Stock: {product.quantity}
                        </span>
                      </div>
                      
                      <button 
  onClick={() => {
    if (!product.id) {
      console.error("⚠️ Produit sans ID :", product);
      return;
    }
    addToCart(product);
  }}
  disabled={product.quantity === 0}
>
  <ShoppingCart className="mr-2" size={20} />
  Ajouter au panier
</button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;