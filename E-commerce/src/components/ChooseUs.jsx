import React from 'react';
import './chooseUs.css';

const ChooseUs = () => {
  return (
    <div className="choose-us-section relative h-screen flex items-center justify-center text-left text-white">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/img/images-gallerie/back.jpg')" }}></div>
      <div className="content relative z-10 p-8">
        <h1 className="text-4xl font-bold mb-4">CHOOSE US</h1>
        <p className="mb-4">
          Client satisfaction is our business goal, we are the team of
          NightShop à domicile which is available when the others are not available for you. We make delivery to your door from 6 pm to 3am in the morning. we are open 7 days in a week.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          VIEW PRODUCTS
        </button>
      </div>
    </div>
  );
};

export default ChooseUs;