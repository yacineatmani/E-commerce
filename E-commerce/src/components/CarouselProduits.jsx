import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import './carousel-produits.css';

const CarouselProduits = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart, inventory, isInventoryLoaded } = useCart(); // Récupère aussi l'état du chargement

  // Attendre que l'inventaire soit chargé avant de filtrer les produits
  useEffect(() => {
    if (!isInventoryLoaded) return;
  
    // 🔥 Nouvelle approche : On force React à détecter les changements en créant une copie de l'inventaire
    const updatedInventory = [...inventory];
  
    const filteredProducts = selectedCategory === ""
      ? updatedInventory  // Si "toutes", afficher tous les produits
      : updatedInventory.filter(product => product.category === selectedCategory);
  
    setProducts(filteredProducts);
    console.log(`🔍 Produits mis à jour pour ${selectedCategory}:`, filteredProducts);
  }, [inventory, selectedCategory, isInventoryLoaded]);
  

  const prevSlide = () => {
    setCurrentIndex(current => (current === 0 ? products.length - 1 : current - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(current => (current === products.length - 1 ? 0 : current + 1));
  };

  // Afficher un message de chargement tant que l'inventaire n'est pas prêt
  if (!isInventoryLoaded) {
    return <p className="text-center text-gray-500">Chargement des produits...</p>;
  }

  return (
    <div className="relative w-full h-96">
      <div className="w-full h-full relative overflow-hidden">
        <div 
          className="absolute w-full h-full flex transition-transform duration-500"
          style={{ width: `${products.length * 100}%`, transform: `translateX(-${(currentIndex * 100) / products.length}%)` }}
        >
         
            {products.map((product) => (
  <div key={`${product.id}-${product.quantity}`} className="relative" style={{ width: `${100 / products.length}%` }}>
              <div className="p-4">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
                <div className="mt-4 bg-white p-4 rounded-lg">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-blue-600 font-bold mt-2">{product.price}€</p>
                  <p>Stock: {inventory.find(item => item.id === product.id)?.quantity ?? 'Non disponible'}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    disabled={inventory.find(item => item.id === product.id)?.quantity === 0}
                    className={`add-to-cart-btn ${inventory.find(item => item.id === product.id)?.quantity === 0 ? 'disabled' : ''}`}
                  >
                    {inventory.find(item => item.id === product.id)?.quantity === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full">
        ←
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full">
        →
      </button>
    </div>
  );
};

export default CarouselProduits;
