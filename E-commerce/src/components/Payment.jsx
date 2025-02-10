import React, { useState } from 'react';
import { useCart } from './CartContext';

const Payment = ({ onPaymentComplete }) => {
  const { cart, processPayment } = useCart();
  const [amount, setAmount] = useState('');
  const [paymentResult, setPaymentResult] = useState(null);

  const handlePayment = () => {
    const result = processPayment(parseFloat(amount));
    setPaymentResult(result);
    if (result.success) {
      setAmount('');
      if (onPaymentComplete) {
        onPaymentComplete(result);
      }
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  return (
    <div className="payment-section border-t p-4">
      <h2 className="text-lg font-bold mb-4">Paiement</h2>
      <div className="flex justify-between mb-4">
        <span>Total à payer:</span>
        <span className="font-bold">{totalAmount}€</span>
      </div>

      <div className="space-y-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Entrez le montant"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Payer
        </button>
      </div>

      {paymentResult && (
        <div className={`mt-3 p-3 rounded ${
          paymentResult.success
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {paymentResult.message}
        </div>
      )}
    </div>
  );
};

export default Payment;