import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [isInventoryLoaded, setIsInventoryLoaded] = useState(false);

  // Chargement initial depuis le localStorage ou le fichier data.json
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedInventory = localStorage.getItem('inventory');
        const storedCart = localStorage.getItem('cart');

        if (storedInventory) {
          console.log('Chargement depuis localStorage:', JSON.parse(storedInventory));
          setInventory(JSON.parse(storedInventory));
          setIsInventoryLoaded(true);
        } else {
          const response = await fetch('../public/data.json');
          const data = await response.json();
          console.log('Chargement depuis data.json:', data.products);
          setInventory(data.products);
          localStorage.setItem('inventory', JSON.stringify(data.products));
          setIsInventoryLoaded(true);
        }

        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Erreur de chargement:', error);
      }
    };

    loadInitialData();
  }, []);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setInventory(prevInventory => {
      const stockItem = prevInventory.find(item => item.id === product.id);
      
      if (!stockItem || stockItem.quantity <= 0) {
        alert('Produit en rupture de stock');
        return prevInventory;
      }
      
      const newInventory = prevInventory.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      
      console.log('Nouvel inventaire après ajout:', newInventory);
      localStorage.setItem('inventory', JSON.stringify(newInventory));
      return newInventory;
    });

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        const newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      } else {
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      }
    });
  };

  // Retirer un produit du panier
  const removeFromCart = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
      setInventory(prevInventory => {
        const newInventory = prevInventory.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + cartItem.quantity }
            : item
        );
        console.log('Nouvel inventaire après retrait:', newInventory);
        localStorage.setItem('inventory', JSON.stringify(newInventory));
        return newInventory;
      });

      setCart(prevCart => {
        const newCart = prevCart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  // Mettre à jour la quantité
  const updateQuantity = (productId, newQuantity) => {
    const cartItem = cart.find(item => item.id === productId);
    
    if (!cartItem || newQuantity < 0) return;

    const inventoryItem = inventory.find(item => item.id === productId);
    const quantityDifference = newQuantity - cartItem.quantity;

    if (inventoryItem.quantity < quantityDifference) {
      alert('Stock insuffisant');
      return;
    }

    setInventory(prevInventory => {
      const newInventory = prevInventory.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - quantityDifference }
          : item
      );
      console.log('Nouvel inventaire après mise à jour de la quantité:', newInventory);
      localStorage.setItem('inventory', JSON.stringify(newInventory));
      return newInventory;
    });

    setCart(prevCart => {
      const newCart = newQuantity === 0
        ? prevCart.filter(item => item.id !== productId)
        : prevCart.map(item =>
            item.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Vider le panier
  const clearCart = () => {
    // Restaurer le stock
    const newInventory = inventory.map(item => {
      const cartItem = cart.find(ci => ci.id === item.id);
      if (cartItem) {
        return { ...item, quantity: item.quantity + cartItem.quantity };
      }
      return item;
    });

    console.log('Inventaire après vidage du panier:', newInventory);
    setInventory(newInventory);
    localStorage.setItem('inventory', JSON.stringify(newInventory));

    // Vider le panier
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  // Traiter le paiement
  const processPayment = (amount) => {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (amount >= totalAmount) {
      clearCart();
      return { 
        success: true, 
        message: `Paiement réussi ! Monnaie rendue : ${(amount - totalAmount).toFixed(2)}€` 
      };
    }
    
    return { 
      success: false, 
      message: 'Montant insuffisant.' 
    };
  };

  return (
    <CartContext.Provider value={{
      cart,
      inventory,
      isInventoryLoaded,
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