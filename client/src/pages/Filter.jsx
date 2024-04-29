import "./Filter.scss";
import { useEffect, useState } from "react";
import FilterByGenre from "../components/FilterByGenre";
import Card from "../components/Card";

function Filter() {
  const [films, setFilms] = useState();
  const [genre, setGenre] = useState([]);
  const [pages, setPages] = useState(1);
  const total = 500;

  const token = import.meta.env.VITE_MY_API_TOKEN;

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr&page=${pages}&sort_by=popularity.desc&with_genres=${genre}`;

    fetch(url, options)
      .then((response) => response.json())
      .then((filmData) => {
        setFilms(filmData.results);
      })
      .catch((err) => console.error(err));
  }, [genre, pages, token]);
  return (
    <>
      <div className="global-filter">
        {pages > 1 && (
          <button
            className="butbut-previous"
            type="button"
            onClick={() => setPages(pages - 1)}
          >
            Précédent
          </button>
        )}

        <FilterByGenre setGenre={setGenre} films={films} />
        {pages < total && (
          <button
            className="butbut-next"
            type="button"
            onClick={() => setPages(pages + 1)}
          >
            Suivant
          </button>
        )}
      </div>
      <div className="filter-card-container">
        {films &&
          films.map((film) => (
            <Card
              key={film.id}
              originalTitle={film?.original_title}
              poster={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              overview={film.overview}
              voteAverage={film.vote_average}
              filmid={film.id}
              title={film.title}
            />
          ))}
      </div>
    </>
  );
}
export default Filter;
