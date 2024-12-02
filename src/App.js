import "./App.css";
import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import MovieDetail from "./components/MovieDetail";
import MyList from "./components/MyList";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResults from "./components/SearchResults"; // IMPORTAÇÃO ADICIONADA
import Footer from "./components/Footer"; // Importando o Footer

export default () => {
  const [searchResults, setSearchResults] = useState([]); // ESTADO ADICIONADO PARA OS RESULTADOS DA PESQUISA
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // Adicionado: Controle para gêneros indesejados
  const [filteredGenres, setFilteredGenres] = useState([
    "horror",
    "romance",
    "documentary",
    "drama",
    "thriller",
  ]);

  const toggleGenreFilter = () => {
    if (filteredGenres.length > 0) {
      setFilteredGenres([]);
    } else {
      setFilteredGenres([
        "horror",
        "romance",
        "documentary",
        "drama",
        "thriller",
      ]);
    }
  };

  // Atualiza o username ao logar ou deslogar
  const updateUsername = (newUsername) => {
    setUsername(newUsername);
    if (newUsername) {
      localStorage.setItem("username", newUsername);
    } else {
      localStorage.removeItem("username");
    }
  };

  useEffect(() => {
    const loadingAll = async () => {
      let list = await Tmdb.getHomeList(filteredGenres); // Passa os gêneros para serem filtrados
      setMovieList(list);

      let comedy = list.filter((i) => i.slug === "comedy");
      let randomChosen = Math.floor(
        Math.random() * (comedy[0].items.results.length - 1)
      );
      let chosen = comedy[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "movie");
      setFeaturedData(chosenInfo);
    };
    loadingAll();
  }, [filteredGenres]); // Recarrega sempre que os gêneros filtrados mudarem

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <Router>
      <div className="page">
        <Header
          black={blackHeader}
          username={username}
          onLogout={() => updateUsername("")}
          setSearchResults={setSearchResults}
          toggleGenreFilter={toggleGenreFilter} // Passa a função para o Header
        />
        <Routes>
          <Route path="/login" element={<Login onLogin={updateUsername} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {featuredData && <FeaturedMovie item={featuredData} />}
                <section className="lists">
                  {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                  ))}
                </section>
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mylist"
            element={
              <ProtectedRoute>
                <MyList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchResults movies={searchResults} />{" "}
                {/* ADICIONADA A ROTA DA PÁGINA DE PESQUISA */}
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer /> {/* Aqui está o Footer adicionado ao final da página */}
      </div>
    </Router>
  );
};
