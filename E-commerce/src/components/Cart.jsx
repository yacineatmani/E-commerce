import React, { useState } from 'react';
import { useCart } from './CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, processPayment, clearCart } = useCart();
  const [amountGiven, setAmountGiven] = useState('');
  const [change, setChange] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState('');

  // Calculer le total du panier
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Fonction pour gérer le paiement
  const handlePayment = () => {
    const amount = parseFloat(amountGiven);
    if (isNaN(amount) || amount < totalAmount) {
      setPaymentMessage('Montant insuffisant.');
      return;
    }

    // Traiter le paiement
    const paymentResult = processPayment(amount);

    if (paymentResult.success) {
      setChange(amount - totalAmount);
      setPaymentMessage(`Merci ! Monnaie à rendre : ${(amount - totalAmount).toFixed(2)}€`);
      
      // Vider le panier après un paiement réussi
      clearCart();
    } else {
      setPaymentMessage(paymentResult.message);
    }

    // Fermer le panier après 3 secondes
    setTimeout(() => {
      onClose();
      setPaymentMessage('');
      setChange(null);
      setAmountGiven('');
    }, 3000);
  };

  return (
    <>
      {/* Volet du panier */}
      <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Panier</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center">Votre panier est vide</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center mb-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.price}€</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700">🗑</button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span>Total à payer:</span>
                <span className="font-bold">{totalAmount.toFixed(2)}€</span>
              </div>
              <input type="number" placeholder="Montant donné" value={amountGiven} onChange={(e) => setAmountGiven(e.target.value)} />
              <button onClick={handlePayment}>Payer</button>
              {paymentMessage && <div>{paymentMessage}</div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
