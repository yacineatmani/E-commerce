import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import './carousel-produits.css';

const CarouselProduitsSoft = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart, inventory, initializeInventory } = useCart();

  useEffect(() => {
    fetch('/src/data.json')
      .then(response => response.json())
      .then(data => {
        const softProducts = data.products.filter(product => product.category === 'soft');
        setProducts(softProducts);
        if (inventory.length === 0) {
          initializeInventory(data.products);
        }
      })
      .catch(error => console.error('Erreur lors du chargement des produits:', error));
  }, [inventory, initializeInventory]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === products.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const getStockLevel = (productId) => {
    const item = inventory.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="carousel relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {products.map(product => (
          <div key={product.id} className="carousel-item w-full flex-shrink-0 p-2">
            <div className="carousel-product">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>Stock: {getStockLevel(product.id)}</p>
              <button 
                onClick={() => addToCart(product)}
                disabled={getStockLevel(product.id) === 0}
                className={`add-to-cart-btn ${getStockLevel(product.id) === 0 ? 'disabled' : ''}`}
              >
                {getStockLevel(product.id) === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2">Prev</button>
      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2">Next</button>
    </div>
  );
};

export default CarouselProduitsSoft;