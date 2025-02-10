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
  const [isCartOpen, setIsCartOpen] = useState(false); // État pour gérer l'ouverture du panier

  return (
    <CartProvider>
      {/* Navbar avec la fonction pour ouvrir le panier */}
      <Navbar onCartToggle={() => setIsCartOpen(true)} />

      {/* Contenu principal */}
      <CarouselGallerie />
      <CarouselCategorie />
      <CarouselProduits />
      <ChooseUs />
      <Footer />

      {/* Cart avec l'état partagé */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartProvider>
  );
}

export default App;