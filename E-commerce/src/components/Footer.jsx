import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Section principale */}
        <div className="content">
          <h2>📍 Où nous trouver</h2>
          <p>Pl. de la Minoterie 10, 1080 Molenbeek-Saint-Jean, Belgium</p>

          {/* Carte Google Maps */}
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.168679866877!2d4.33703081590864!3d50.8503469795326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c480bae42c03%3A0x355dcb11ddcc0de2!2sPl.%20de%20la%20Minoterie%2010%2C%201080%20Molenbeek-Saint-Jean%2C%20Belgium!5e0!3m2!1sen!2sfr!4v1662479114852!5m2!1sen!2sfr"
              width="100%"
              height="350"
              allowFullScreen=""
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
          </div>

          {/* Bouton pour obtenir l'itinéraire */}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Pl.+de+la+Minoterie+10,+1080+Molenbeek-Saint-Jean,+Belgium"
            target="_blank"
            rel="noopener noreferrer"
          >
            🗺 Obtenir l'itinéraire
          </a>
        </div>
      </div>

      {/* Section bas du footer */}
      <div className="bottom">
        <p>© 2025 <span className="font-semibold">MolenGeek</span>. Tous droits réservés.</p>
        <p>Conçu par <span className="font-semibold text-blue-400">Yacine</span> & <span className="font-semibold text-blue-400">Lydéric</span></p>

        {/* Réseaux sociaux */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
