import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Para navegação e obter localização
import "./Header.css";
import { FaWandMagic } from "react-icons/fa6";
import CINEINFLogo from "../assets/CINEINF-BG.png"; // Importando a imagem

const API_KEY = "38c007f28d5b66f36b9c3cf8d8452a4b";

// Componente de Barra de Pesquisa
const SearchBar = ({ setSearchResults }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
      navigate("/search");
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        type="text"
        placeholder="Pesquise por um filme..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>
        <FaWandMagic size={18} />
      </button>
    </div>
  );
};

// Função para gerar uma cor aleatória com base no nome do usuário
const generateColor = (username) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
};

// Componente principal do Header
export default ({ black, setSearchResults, toggleGenreFilter }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtendo a localização atual da URL
  const currentUser = localStorage.getItem("username");
  const userInitial = currentUser ? currentUser.charAt(0).toUpperCase() : "U";
  const userColor = currentUser ? generateColor(currentUser) : "#3498db";

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("favorites");
    navigate("/login");
  };

  // Estado para controlar a visibilidade do conteúdo adulto
  const [isAdultContentVisible, setIsAdultContentVisible] = useState(false);

  // Função para alternar entre mostrar e ocultar conteúdo adulto
  const toggleAdultContent = () => {
    setIsAdultContentVisible((prevState) => !prevState); // Alterna o estado
    toggleGenreFilter(); // Chama a função recebida de App.js
  };

  return (
    <div>
      <header className={black ? "black" : ""}>
        {/* LOGO NO CANTO SUPERIOR ESQUERDO */}
        <div className="header--logo">
          <img src={CINEINFLogo} alt="CINEINF Logo" />
        </div>

        {/* Só exibe a barra de pesquisa se não estiver nas páginas de login ou cadastro */}
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <div className="header-inputQuery">
              <SearchBar setSearchResults={setSearchResults} />
            </div>
          )}

        <div className="header--user">
          {/* Exibe a parte de conteúdo adulto apenas nas páginas de login ou cadastro */}
          {location.pathname !== "/login" &&
            location.pathname !== "/register" && (
              <div className="header--user--adult">
                <p>Filtrar conteúdo sensível?</p>
                <button
                  className="button-toggle-adult"
                  onClick={toggleAdultContent}
                >
                  {isAdultContentVisible ? "Não" : "Sim"}
                </button>
              </div>
            )}

          {/* Cartão de usuário */}
          <div
            className="header--user-card"
            style={{ backgroundColor: userColor }}
          >
            {userInitial}
          </div>

          {/* Botão de logout */}
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>
    </div>
  );
};
