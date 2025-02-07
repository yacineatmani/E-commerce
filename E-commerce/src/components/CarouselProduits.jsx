// import React, { useState, useEffect } from 'react';
// import './carousel-produits.css';

// const CarouselProduits = () => {
//   const [products, setProducts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     fetch('/src/data.json')
//       .then(response => response.json())
//       .then(data => {
//         // Filtrer les produits pour cette catégorie spécifique
//         const categoryProducts = data.products.filter(
//           product => product.category === 'cigarette' // Changer selon la catégorie
//         );
//         setProducts(categoryProducts);
//       })
//       .catch(error => console.error('Error:', error));
//   }, []);

//   const prevSlide = () => {
//     setCurrentIndex(current => 
//       current === 0 ? products.length - 1 : current - 1
//     );
//   };

//   const nextSlide = () => {
//     setCurrentIndex(current => 
//       current === products.length - 1 ? 0 : current + 1
//     );
//   };

//   return (
//     <div className="relative w-full h-96">
//       <div className="w-full h-full relative overflow-hidden">
//         <div 
//           className="absolute w-full h-full flex transition-transform duration-500"
//           style={{ 
//             width: `${products.length * 100}%`,
//             transform: `translateX(-${(currentIndex * 100) / products.length}%)`
//           }}
//         >
//           {products.map((product) => (
//             <div 
//               key={product.id}
//               className="relative"
//               style={{ width: `${100 / products.length}%` }}
//             >
//               <div className="p-4">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-64 object-cover rounded-lg"
//                 />
//                 <div className="mt-4 bg-white p-4 rounded-lg">
//                   <h3 className="text-xl font-bold">{product.name}</h3>
//                   <p className="text-gray-600">{product.description}</p>
//                   <p className="text-blue-600 font-bold mt-2">{product.price}€</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full"
//       >
//         ←
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full"
//       >
//         →
//       </button>
//     </div>
//   );
// };

// export default CarouselProduits;