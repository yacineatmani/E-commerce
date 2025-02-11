import React, { useState } from 'react';
import { useCart } from './CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, processPayment, clearCart } = useCart();
  const [amountGiven, setAmountGiven] = useState('');
  const [change, setChange] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [thankYouMessage, setThankYouMessage] = useState('');

  // Calcul du total du panier
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Fonction pour gérer le paiement
  const handlePayment = () => {
    const amount = parseFloat(amountGiven);
    if (isNaN(amount) || amount < totalAmount) {
      setPaymentMessage('❌ Montant insuffisant.');
      return;
    }

    // Traitement du paiement
    const paymentResult = processPayment(amount);

    if (paymentResult.success) {
      setChange(amount - totalAmount);
      setPaymentMessage(`✅ Monnaie à rendre : ${(amount - totalAmount).toFixed(2)}€`);
      setThankYouMessage("Merci d'avoir fait vos achats ! À bientôt ! 🎉");
      clearCart();
    } else {
      setPaymentMessage(paymentResult.message);
    }

    // Reset après 3s
    setTimeout(() => {
      onClose();
      setPaymentMessage('');
      setChange(null);
      setAmountGiven('');
      setThankYouMessage('');
    }, 3000);
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="h-full flex flex-col">
        {/* En-tête */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-100">
          <h2 className="text-xl font-bold">🛒 Panier</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>

        {/* Contenu du panier */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Votre panier est vide.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center mb-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">{item.price}€</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="ml-4 text-red-500 hover:text-red-700 text-lg"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Paiement */}
        {cart.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between mb-4 text-lg font-semibold">
              <span>Total à payer :</span>
              <span className="text-green-600">{totalAmount.toFixed(2)}€</span>
            </div>

            <input 
              type="number" 
              placeholder="💶 Montant donné" 
              value={amountGiven} 
              onChange={(e) => setAmountGiven(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />

            <button 
              onClick={handlePayment} 
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              💰 Payer
            </button>

            {/* Affichage des messages */}
            {paymentMessage && (
              <div className={`mt-3 text-center font-semibold ${change !== null ? 'text-green-600' : 'text-red-600'}`}>
                {paymentMessage}
              </div>
            )}

            {thankYouMessage && (
              <div className="mt-3 text-center text-green-700 font-bold">
                {thankYouMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
