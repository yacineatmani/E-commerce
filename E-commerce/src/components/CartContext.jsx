import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState([]);

  // Chargement initial depuis le localStorage ou le fichier data.json
  useEffect(() => {
    const storedInventory = localStorage.getItem('inventory');
    const storedCart = localStorage.getItem('cart');

    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    } else {
      fetch('/data.json')
        .then(response => response.json())
        .then(data => {
          setInventory(data.products);
          localStorage.setItem('inventory', JSON.stringify(data.products));
        })
        .catch(error => console.error('Erreur:', error));
    }

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    const productInInventory = inventory.find(item => item.id === product.id);

    if (!productInInventory || productInInventory.quantity <= 0) {
      alert('Produit en rupture de stock');
      return;
    }

    // Mise à jour de l'inventaire
    const updatedInventory = inventory.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));

    // Mise à jour du panier
    const updatedCart = cart.find(item => item.id === product.id)
      ? cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Retirer un produit du panier
  const removeFromCart = (productId) => {
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
      // Réajuster l'inventaire
      const updatedInventory = inventory.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + cartItem.quantity }
          : item
      );
      setInventory(updatedInventory);
      localStorage.setItem('inventory', JSON.stringify(updatedInventory));

      // Retirer du panier
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Mettre à jour la quantité d'un produit dans le panier
  const updateQuantity = (productId, newQuantity) => {
    const cartItem = cart.find(item => item.id === productId);
    
    if (!cartItem || newQuantity < 1) return;

    // Ajuster le stock en fonction de la nouvelle quantité
    const updatedInventory = inventory.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + cartItem.quantity - newQuantity }
        : item
    );

    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));

    // Mise à jour du panier
    const updatedCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Vider complètement le panier
  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  // Traiter le paiement
  const processPayment = (amount) => {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (amount >= totalAmount) {
      clearCart();
      return { success: true, message: `Paiement réussi ! Monnaie rendue : ${(amount - totalAmount).toFixed(2)}€` };
    } else {
      return { success: false, message: 'Montant insuffisant.' };
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      inventory,
      addToCart,
      removeFromCart,
      updateQuantity,
      processPayment,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
