import React, { useState } from 'react';
import { CartProvider } from './components/CartContext';
import CarouselGallerie from './components/CarouselGallerie';
import CarouselCategorie from './components/CarouselCategorie';
import CarouselProduits from './components/CarouselProduits';
import ChooseUs from './components/ChooseUs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false); // Gérer l'ouverture du panier
  const [selectedCategory, setSelectedCategory] = useState("soft"); // Catégorie par défaut

  return (
    <CartProvider>
      {/* Navbar avec ouverture du panier */}
      <Navbar onCartToggle={() => setIsCartOpen(true)} />

      {/* Contenu principal */}
      <CarouselGallerie />
      
      {/* Sélection de la catégorie */}
      <CarouselCategorie onSelectCategory={setSelectedCategory} />

      {/* Produits de la catégorie sélectionnée */}
      <CarouselProduits selectedCategory={selectedCategory} />

      <ChooseUs />
      <Footer />

      {/* Cart avec gestion de l'affichage */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartProvider>
  );
}

export default App;
