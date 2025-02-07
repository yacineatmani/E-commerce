import React, { useState } from 'react';
import './carousel-categorie.css';
import CategoryCarousel from './CategoryCarousel';

const CarouselCategorie = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Données des catégories
  const categories = [
    { id: 'cigarette', name: 'Cigarette', image: '/public/img/images-categorie/cigarette.png' },
    { id: 'food', name: 'food', image: '/public/img/images-categorie/food.png' },
    { id: 'frozen', name: 'Frozen', image: '/public/img/images-categorie/frozen.png' },
    { id: 'liquor', name: 'Liquor', image: '/public/img/images-categorie/liquor.png' },
    { id: 'mistery', name: 'Mistery', image: '/public/img/images-categorie/mistery.png' },
    { id: 'soft', name: 'Soft', image: '/public/img/images-categorie/soft.png' }
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Grille des catégories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categories.map((category) => (
          <div 
            key={category.id}
            className={`cursor-pointer p-4 rounded-lg shadow-lg transition-all ${
              selectedCategory === category.id 
                ? 'bg-blue-100 border-2 border-blue-500' 
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <h3 className="text-center font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Zone d'affichage du carousel */}
      {selectedCategory && (
        <div className="carousel-container">
          <CategoryCarousel category={selectedCategory} />
        </div>
      )}
    </div>
  );
};

export default CarouselCategorie;