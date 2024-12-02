import React from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./FeaturedMovie.css";

export default ({ item }) => {
  const navigate = useNavigate(); // Inicializar o useNavigate

  let firstDate = new Date(item.first_air_date);
  let genres = item.genres.map((genre) => genre.name);
  let description = item.overview;

  if (description.length > 200) {
    description = description.substring(0, 200) + "...";
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(http://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">
            {item.comedy_title || item.title}
          </div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} pontos</div>
            <div className="featured--year"> {firstDate.getFullYear()}</div>
            <div className="featured--seasons">
              {item.number_of_seasons} temporada
              {item.number_of_seasons !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="featured--description">{description}</div>
          <div className="featured--buttons">
            <a href={`/watch/${item.id}`} className="featured--watchbutton">
              <img
                className="play"
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/play--v1.png"
                alt="play--v1"
              />
              Assistir
            </a>
            <button
              onClick={() => navigate("/mylist")}
              className="featured--mylistbutton"
            >
              + Minha Lista
            </button>
          </div>
          <div className="featured--genres">
            <strong>Gêneros:</strong>
            {genres.join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
};
