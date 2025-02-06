import React, { useEffect, useState } from 'react';

const CarouselProduits = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/src/data.json')
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

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

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {products.map(product => (
          <div key={product.id} className="w-1/3 flex-shrink-0 p-2">
            <div className="border p-4 rounded-lg shadow-lg flex flex-col items-center">
              <div className="w-full h-32 mb-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
              </div>
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-1">Price: ${product.price}</p>
              <p className="text-gray-700 mb-4">Quantity: {product.quantity}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Ajouter au panier
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

export default CarouselProduits;