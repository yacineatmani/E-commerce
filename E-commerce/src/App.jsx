import React from 'react';
import CarouselCategorie from './components/carousel-categorie';
import CarouselGallerie from './components/carousel-gallerie';
import CarouselProduits from './components/carousel-produits';

function App() {
  return (
    <div className="App">
      <CarouselGallerie />
 
      <CarouselProduits />
      <CarouselCategorie />
    </div>
  );
}

export default App;