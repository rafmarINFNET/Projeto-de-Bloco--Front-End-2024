import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"; // Importando ícones

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer--content">
        <p>© 2024 Meu App | Todos os direitos reservados</p>
        <div className="footer--social">
          {/* Ícones das redes sociais */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="footer--icon" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="footer--icon" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="footer--icon" />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="footer--icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
