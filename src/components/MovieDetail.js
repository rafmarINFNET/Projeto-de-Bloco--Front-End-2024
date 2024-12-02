import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Tmdb from "../Tmdb";
import "./MovieDetail.css";
import Button from "./Button";
import StarRating from "./StarRating";
import { FaHeart, FaHome, FaPlay } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    const fetchMovieData = async () => {
      let movieInfo = await Tmdb.getMovieInfo(id, "movie");
      setMovieData(movieInfo);
    };
    fetchMovieData();
  }, [id]);

  const handleFetchTrailer = async () => {
    setLoadingTrailer(true);
    try {
      const movieInfo = await Tmdb.getMovieInfo(id, "movie");
      const trailer = movieInfo.videos?.results.find(
        (video) => video.type === "Trailer"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setAlertMessage("Trailer não encontrado.");
        setAlertSeverity("warning");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Erro ao buscar trailer:", error);
      setAlertMessage("Erro ao buscar trailer.");
      setAlertSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoadingTrailer(false);
    }
  };

  const handleAddToFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Verifica se o filme já está na lista
    if (!storedFavorites.some((favorite) => favorite.id === movieData.id)) {
      storedFavorites.push(movieData);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      setAlertMessage("Filme adicionado aos favoritos!");
      setAlertSeverity("success");
    } else {
      setAlertMessage("Este filme já está na sua lista de favoritos.");
      setAlertSeverity("warning");
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (!movieData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="movie-detail-card">
      <div
        className="movie-detail-banner"
        style={{
          backgroundImage: `url(http://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
        }}
      >
        <h1 className="movie-detail-title">
          {movieData.title || movieData.name}
        </h1>
      </div>
      <div className="movie-detail-content">
        <p>{movieData.overview}</p>
        <div>Avaliação: {movieData.vote_average}</div>
        <div>
          Gêneros:{" "}
          {movieData.genres && movieData.genres.length > 0
            ? movieData.genres.map((genre) => genre.name).join(", ")
            : "Não disponível"}
        </div>
        <div>Data de lançamento: {movieData.release_date}</div>

        <StarRating onRatingChange={setUserRating} />
        <div style={{ margin: "20px 0" }}>
          Avaliação do Usuário: {userRating} estrelas
        </div>

        <div className="button-container">
          <Link to="/" className="back-button">
            <FaHome className="icon" />
            Voltar à Página Principal
          </Link>
          <Button
            primary
            onClick={handleFetchTrailer}
            icon={FaPlay}
            disabled={loadingTrailer}
          >
            {loadingTrailer ? "Carregando..." : "Ver Trailer"}
          </Button>
          <Button primary onClick={handleAddToFavorites} icon={FaHeart}>
            Adicionar aos Favoritos
          </Button>
        </div>

        {trailerUrl && (
          <div className="trailer-container">
            <iframe
              width="660"
              height="315"
              src={trailerUrl}
              frameBorder="0"
              allowFullScreen
              title="Trailer"
            />
          </div>
        )}
      </div>

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

export default MovieDetail;
