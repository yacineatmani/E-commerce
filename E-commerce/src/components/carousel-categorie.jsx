import React, { useEffect, useState } from 'react';

const CarouselCategorie = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/src/data.json')
      .then(response => response.json())
      .then(data => setCategories(data.products)); // Change this to match your categories structure
  }, []);

  return (
    <div className="carousel">
      {categories.map(category => (
        <div key={category.id} className="carousel-item">
          <img src={category.image} alt={category.name} />
          <h2>{category.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default CarouselCategorie;