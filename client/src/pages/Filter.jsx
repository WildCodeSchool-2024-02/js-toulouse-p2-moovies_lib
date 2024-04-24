import "./Filter.scss";
import { useEffect, useState } from "react";
import FilterByGenre from "../components/FilterByGenre";

function Filter() {
  const [film, setFilm] = useState();
  const [genre, setGenre] = useState();
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTk3ZWFhY2EyMTM4MmMyZTZiZmMyYTRjNTI5YzA4MiIsInN1YiI6IjY2MTY5ZDIzMTA5ZGVjMDE3YjllMjk3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3TeDs18ldQsvR612HvNB4DjZdTPJyovbjAVB8afs3-Q",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr&page=1&sort_by=popularity.desc&with_genres=${genre}`,
      options
    )
      .then((response) => response.json())
      .then((filmData) => {
        setFilm(filmData.results);
      })
      .catch((err) => console.error(err));
  }, [genre]);
  return <FilterByGenre setGenre={setGenre} film={film} />;
}
export default Filter;
