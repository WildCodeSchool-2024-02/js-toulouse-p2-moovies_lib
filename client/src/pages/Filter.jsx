import "./Filter.scss";
import { useEffect, useState } from "react";
import FilterByGenre from "../components/FilterByGenre";
import Card from "../components/Card";

function Filter() {
  const [films, setFilms] = useState();
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTk3ZWFhY2EyMTM4MmMyZTZiZmMyYTRjNTI5YzA4MiIsInN1YiI6IjY2MTY5ZDIzMTA5ZGVjMDE3YjllMjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3TeDs18ldQsvR612HvNB4DjZdTPJyovbjAVB8afs3-Q",
      },
    };

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr&page=1&sort_by=popularity.desc&with_genres=${genre}`;

    fetch(url, options)
      .then((response) => response.json())
      .then((filmData) => {
        setFilms(filmData.results);
      })
      .catch((err) => console.error(err));
  }, [genre]);

  return (
    <>
      <FilterByGenre setGenre={setGenre} films={films} />
      {films &&
        films.map((film) => (
          <Card
            key={film.id}
            title={film.original_title}
            poster={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            overview={film.overview}
            voteAverage={film.vote_average}
            filmid={film.id}
          />
        ))}
    </>
  );
}
export default Filter;
