import React, { useEffect, useState } from 'react';

const CarouselGallerie = ({ category }) => {
  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset l'index quand la catégorie change
    setCurrentIndex(0);
    
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Échec du chargement des données');
        }
        return response.json();
      })
      .then((data) => {
        // Filtrer les images par catégorie si une catégorie est spécifiée
        const filteredGallery = category 
          ? data.gallery.filter(item => item.category === category)
          : data.gallery;
        setGallery(filteredGallery);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement de la galerie:', error);
        setError('Impossible de charger la galerie. Veuillez réessayer plus tard.');
      });
  }, [category]); // Recharger quand la catégorie change

  useEffect(() => {
    if (gallery.length <= 1) return; // Ne pas démarrer le timer s'il n'y a pas assez d'images
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [currentIndex, gallery.length]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? gallery.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === gallery.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  if (gallery.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Aucune image trouvée pour cette catégorie</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {gallery.map(item => (
          <div key={item.id} className="w-full flex-shrink-0 h-full">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {gallery.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            &#10094;
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
};

export default CarouselGallerie;