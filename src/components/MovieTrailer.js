// src/MovieTrailer.js
import React, { useEffect, useState } from "react";
import api from "./api";

const MovieTrailer = ({ movieId }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        // Obtenha detalhes do filme e vídeos em uma única chamada com append_to_response
        const response = await api.get(
          `/movie/${movieId}?append_to_response=videos`
        );
        const movieInfo = response.data;

        // Verifique se há vídeos e filtre para encontrar o trailer oficial do YouTube
        const trailer = movieInfo.videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        } else {
          setError("Trailer não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar informações do filme:", error);
        setError("Erro ao carregar informações do filme.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieInfo();
  }, [movieId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {trailerUrl ? (
        <iframe
          width="560"
          height="315"
          src={trailerUrl}
          frameBorder="0"
          allowFullScreen
          title="Trailer"
        />
      ) : (
        <p>Trailer não encontrado.</p>
      )}
    </div>
  );
};

export default MovieTrailer;
