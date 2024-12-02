// ESTE ARQUIVO É NOVO
import React from "react";
import { Link } from "react-router-dom";
import "./MyList.css"; // Reutilizando o CSS de MyList

const SearchResults = ({ movies }) => {
  return (
    <div className="my-list">
      <h1>Resultados: {movies.length}</h1>
      <div className="linha"></div>
      {movies.length === 0 ? (
        <p>Nenhum resultado encontrado.</p>
      ) : (
        <div className="my-list__banners">
          {movies.map((item) => (
            <div key={item.id} className="my-list__banner">
              <img
                src={`http://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title || item.comedy_title}
                className="my-list__image"
              />
              <div className="my-list__info">
                <h2>{item.title || item.comedy_title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="button-container">
        <Link to="/" className="back-button">
          Voltar à Página Principal
        </Link>
      </div>
    </div>
  );
};

export default SearchResults;
