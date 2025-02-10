import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext'; // Importez le contexte

const CarouselProduits = () => {
  const [products, setProducts] = useState([]); // État local pour les produits affichés
  const [currentIndex, setCurrentIndex] = useState(0); // État pour le carrousel
  const { addToCart, inventory } = useCart(); // Utilisez `inventory` du contexte

  // Mettez à jour les produits affichés lorsque l'inventaire change
  useEffect(() => {
    const cigarettes = inventory.filter(p => p.category === 'cigarette'); // Filtrez par catégorie
    setProducts(cigarettes); // Mettez à jour les produits affichés
  }, [inventory]); // Dépendance sur `inventory` pour re-rendre lorsque l'inventaire change

  if (products.length === 0) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="relative w-full h-96">
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="absolute w-full h-full flex"
          style={{
            width: `${products.length * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / products.length}%)`
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="relative"
              style={{ width: `${100 / products.length}%` }}
            >
              <div className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 bg-white p-4 rounded-lg">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-blue-600 font-bold mt-2">{product.price}€</p>
                  <p className="font-medium">Stock: {product.quantity}</p>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.quantity === 0}
                    className={`mt-2 w-full px-4 py-2 rounded-lg ${
                      product.quantity === 0
                        ? 'bg-gray-300'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {product.quantity === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
  );
};

export default CarouselProduits;