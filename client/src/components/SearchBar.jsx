import { useState, useEffect } from "react";
import "./SearchBar.scss";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const token = import.meta.env.VITE_MY_API_TOKEN;

  useEffect(() => {
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
          console.log(data);
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
        placeholder="Cherche Ton Film"
      />
      {searchResult.length !== 0 && searchText !== "" && (
        <div className="container-handleChange">
          <p>
            Page {currentPage} sur {totalPages}
          </p>
        </div>
      )}
      {searchResult.length > 0 &&
        searchText !== "" &&
        searchResult.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      {searchText === "" && <p>Veuillez rentrer le nom d'un film</p>}
      {searchText !== "" && searchResult.length === 0 && (
        <p>Désolé, aucun film ne correspond à ta recherche</p>
      )}
      {searchResult.length !== 0 && searchText !== "" && (
        <div className="container-handleChange">
          <div className="container-btn">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
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
