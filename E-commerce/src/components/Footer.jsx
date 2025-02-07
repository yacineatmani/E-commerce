import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-white py-8 w-full">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section "Où nous trouver" */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Titre */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Où nous trouver
          </h2>

          {/* Adresse et carte */}
          <div className="flex flex-col items-center lg:items-center gap-6">
            {/* Adresse */}
            <div className="text-center lg:text-center w-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Adresse :
              </h3>
              <p className="text-gray-600 mb-4">
                Pl. de la Minoterie 10, 1080 Molenbeek-Saint-Jean, Belgium
              </p>
            </div>

            {/* Carte Google Maps */}
            <div className="w-full lg:w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.168679866877!2d4.33703081590864!3d50.8503469795326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c480bae42c03%3A0x355dcb11ddcc0de2!2sPl.%20de%20la%20Minoterie%2010%2C%201080%20Molenbeek-Saint-Jean%2C%20Belgium!5e0!3m2!1sen!2sfr!4v1662479114852!5m2!1sen!2sfr"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Bouton "Obtenir l'itinéraire" */}
            <div className="text-center mt-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Pl.+de+la+Minoterie+10,+1080+Molenbeek-Saint-Jean,+Belgium"
                target="_blank"
                className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Obtenir l'itinéraire
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer information */}
      <div className="bg-gray-700 py-6 mt-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-gray-300">
            © 2025 <span className="font-semibold">MolenGeek</span>. Tous droits réservés.
          </p>
          <p className="text-sm text-gray-300 mt-2">
            Conçu par <span className="font-semibold text-blue-500">MolenGeek</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
