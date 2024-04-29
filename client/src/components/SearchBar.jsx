import { useState, useEffect, useContext } from "react";
import "./SearchBar.scss";
import { ThemeContext } from "../contexts/ThemeContext";
import Card from "./Card";

function SearchBar() {
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const token = import.meta.env.VITE_MY_API_TOKEN;
    if (searchText !== "") {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=fr&page=${currentPage}`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResult(data.results);
          setTotalPages(data.total_pages);
        })
        .catch((error) => {
          console.error("Erreur:", error);
        });
    }
  }, [searchText, currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => {
      const prevPage = prev < totalPages ? prev - 1 : prev;
      if (prevPage !== prev) {
        window.scrollTo(0, 0);
      }
      return prevPage;
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => {
      const nextPage = prev < totalPages ? prev + 1 : prev;
      if (nextPage !== prev) {
        window.scrollTo(0, 0);
      }
      return nextPage;
    });
  };

  return (
    <div className="container-searchBar">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Cherche ton film"
      />
      {searchResult.length !== 0 && searchText !== "" && (
        <div className="container-handleChange">
          <p>
            Page {currentPage} sur {totalPages}
          </p>
        </div>
      )}
      {searchText === "" && <p>Veuillez rentrer le nom d'un film</p>}
      {searchText !== "" && searchResult.length === 0 && (
        <p>Désolé, aucun film ne correspond à ta recherche</p>
      )}
      <div className="grid-container-cards">
        {searchResult.length > 0 &&
          searchText !== "" &&
          searchResult.map((movie) => (
            <Card
              key={movie.id}
              originalTitle={movie?.original_title}
              poster={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              overview={movie?.overview}
              voteAverage={movie?.vote_average}
              filmid={movie?.id}
              title={movie?.title}
            />
          ))}
      </div>

      {searchResult.length !== 0 && searchText !== "" && (
        <div className="container-handleChange">
          <div className="container-btn">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={theme}
            >
              Précédent
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={theme}
            >
              Suivant
            </button>
          </div>
          <p>
            Page {currentPage} sur {totalPages}
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
