import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyList.css";
import { FaTrash } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const MyList = () => {
  const [favorites, setFavorites] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const confirmRemove = window.confirm(
      "Você realmente deseja remover este filme da sua lista?"
    );
    if (confirmRemove) {
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setAlertMessage("Filme removido com sucesso!");
      setAlertSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const addToFavorites = (item) => {
    if (favorites.some((fav) => fav.id === item.id)) {
      setAlertMessage("Esse filme já está na sua lista!");
      setAlertSeverity("warning");
    } else {
      const updatedFavorites = [...favorites, item];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setAlertMessage("Filme adicionado à sua lista!");
      setAlertSeverity("success");
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="my-list">
      <h1>Minha Lista</h1>
      <div className="linha"></div>
      {favorites.length === 0 ? (
        <p>Você ainda não tem filmes favoritos.</p>
      ) : (
        <div className="my-list__banners">
          {favorites.map((item) => (
            <div key={item.id} className="my-list__banner">
              <img
                src={`http://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title || item.comedy_title}
                className="my-list__image"
              />
              <div className="my-list__info">
                <h2>{item.title || item.comedy_title}</h2>
              </div>
              <FaTrash
                className="remove-icon"
                onClick={() => removeFromFavorites(item.id)}
              />
            </div>
          ))}
        </div>
      )}
      <div className="button-container">
        <Link to="/" className="back-button">
          Voltar à Página Principal
        </Link>
      </div>

      {/* Snackbar para Alertas */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MyList;
