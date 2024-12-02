import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = ({ onRatingChange, userId }) => {
  // Tenta obter a avaliação salva do localStorage (usando o userId para diferenciar avaliações)
  const [rating, setRating] = useState(() => {
    const savedRating = localStorage.getItem(`rating_${userId}`);
    return savedRating ? parseInt(savedRating) : 0; // Retorna a avaliação salva ou 0 se não houver
  });

  const handleClick = (value) => {
    setRating(value);
    localStorage.setItem(`rating_${userId}`, value); // Salva a avaliação no localStorage
    onRatingChange(value); // Chama a função de callback, se necessário
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          className={`star ${value <= rating ? "filled" : ""}`}
          onClick={() => handleClick(value)}
          style={{
            cursor: "pointer",
            color: value <= rating ? "#e50914" : "#555",
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
