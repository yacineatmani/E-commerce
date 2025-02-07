import React, { useState } from 'react';
import { Trash2, ShoppingCart, X } from 'lucide-react';
import { useCart } from './CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // Utilisation correcte du hook
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePayment = () => {
    alert('Passage en caisse - Montant total : ' + calculateTotal() + ' €');
  };

  return (
    <div className="relative">
      {/* Bouton du panier */}
      <button 
        onClick={toggleCart} 
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <ShoppingCart size={24} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
          {cartItems.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </button>

      {/* Volet latéral du panier */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50 transform translate-x-0 transition-transform">
          <div className="p-6 bg-gray-100 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Votre Panier</h2>
            <button onClick={toggleCart} className="text-gray-600 hover:text-gray-900">
              <X size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center p-6 text-gray-500">
              Votre panier est vide
            </div>
          ) : (
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 px-2 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 px-2 rounded"
                      >
                        +
                      </button>
                      <span className="ml-2">
                        {(item.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Récapitulatif et bouton de paiement */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total</span>
                <span className="font-bold">{calculateTotal()} €</span>
              </div>
              <button 
                onClick={handlePayment}
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
              >
                Procéder au paiement
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
