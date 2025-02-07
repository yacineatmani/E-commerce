// src/App.jsx
import React from 'react';
import { CartProvider } from './components/CartContext';
import CarouselGallerie from './components/Carousel-gallerie';
import CarouselCategorie from './components/CarouselCategorie';
// import CarouselProduits from './components/CarouselProduits';
import ChooseUs from './components/ChooseUs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart'; // Assurez-vous que ce fichier existe
import './App.css';

function App() {
  return (
    <CartProvider>
        <Navbar />
        <CarouselGallerie />
        <CarouselCategorie />
        {/* <CarouselProduits /> */}
        <ChooseUs />
        <Footer />
        <Cart />
    
    </CartProvider>
  );
}

export default App;