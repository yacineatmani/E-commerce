import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import './carousel-produits.css';

const CarouselProduits = ({ selectedCategory = 'Soft Drinks' }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart, inventory, initializeInventory } = useCart();
  const itemsToShow = 5;

  // Mapping des catégories pour la conversion
  const categoryMapping = {
    'Soft Drinks': 'soft',
    'Cigarettes': 'cigarette',
    'Mystery': 'mistery',
    'Liquor': 'liquor',
    'food': 'food',
    'Frozen': 'frozen'
  };

  useEffect(() => {
    fetch('../public/data.json')
      .then(response => response.json())
      .then(data => {
        if (inventory.length === 0) {
          initializeInventory(data.products);
        }
      })
      .catch(error => console.error('Erreur lors du chargement des produits:', error));
  }, [initializeInventory]);

  useEffect(() => {
    // Mettre à jour les produits quand la catégorie change
    const categoryToFilter = categoryMapping[selectedCategory] || selectedCategory.toLowerCase();
    console.log('Filtering for category:', categoryToFilter); // Pour le débogage
    
    const filteredProducts = inventory.filter(product => {
      return product.category === categoryToFilter;
    });
    
    console.log('Filtered products:', filteredProducts); // Pour le débogage
    setProducts(filteredProducts);
    setCurrentIndex(0); // Réinitialiser l'index à chaque changement de catégorie
  }, [selectedCategory, inventory]);

  const prevSlide = () => {
    setCurrentIndex(current => Math.max(current - 1, 0));
  };

  const nextSlide = () => {
    setCurrentIndex(current => {
      const maxIndex = Math.max(0, products.length - itemsToShow);
      return Math.min(current + 1, maxIndex);
    });
  };

  const getStockLevel = (productId) => {
    const item = inventory.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const getCategoryTitle = () => {
    const titles = {
      'soft': 'Nos Articles',
      'cigarette': 'Nos Cigarettes',
      'mistery': 'Produits Mystère',
      'liquor': 'Nos Boissons Alcoolisées',
      'food': 'Nos Snacks',
      'frozen': 'Nos Produits Surgelés'
    };
    
    const mappedCategory = categoryMapping[selectedCategory] || selectedCategory.toLowerCase();
    return titles[mappedCategory] || selectedCategory;
  };

  return (
    <div className="relative py-8 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg mx-4 my-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{getCategoryTitle()}</h2>
      <div className="carousel relative w-full overflow-hidden px-4">
        <div 
          className="flex transition-transform duration-500" 
          style={{ 
            transform: `translateX(-${(currentIndex * (100 / itemsToShow))}%)`,
            gap: '1rem'
          }}
        >
          {products.map(product => (
            <div 
              key={product.id} 
              className="carousel-item"
              style={{ 
                flex: `0 0 ${100 / itemsToShow}%`,
                maxWidth: `${100 / itemsToShow}%`
              }}
            >
              <div className="carousel-product bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105">
                <div className="relative pb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <p className="text-sm font-semibold text-gray-800">{product.price}€</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Stock: {getStockLevel(product.id)}</p>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={getStockLevel(product.id) === 0}
                  className={`w-full py-2 px-4 rounded-lg transition-colors duration-300 ${
                    getStockLevel(product.id) === 0 
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  }`}
                >
                  {getStockLevel(product.id) === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {products.length > itemsToShow && (
          <>
            <button 
              onClick={prevSlide} 
              disabled={currentIndex === 0}
              className={`absolute top-1/2 -left-2 transform -translate-y-1/2 w-10 h-10 rounded-full shadow-lg z-10 flex items-center justify-center ${
                currentIndex === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <span className="text-gray-800">←</span>
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentIndex >= products.length - itemsToShow}
              className={`absolute top-1/2 -right-2 transform -translate-y-1/2 w-10 h-10 rounded-full shadow-lg z-10 flex items-center justify-center ${
                currentIndex >= products.length - itemsToShow 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <span className="text-gray-800">→</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CarouselProduits;