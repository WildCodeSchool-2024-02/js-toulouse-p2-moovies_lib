import { useEffect, useState } from "react";
import "./FilterByGenre.scss";
import PropTypes from "prop-types";

function FilterByGenre({ setGenre }) {
  const [data, setData] = useState();
  const token = import.meta.env.VITE_MY_API_TOKEN;

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=fr", options)
      .then((response) => response.json())
      .then((genresData) => setData(genresData.genres))
      .catch((error) => console.error(error));
  }, [token]);
  return data ? (
    <div className="dropdown-menu">
      <i className="fi fi-rr-settings-sliders" />
      <select
        className="FiltreStyle"
        onChange={(event) => {
          setGenre(event.target.value);
        }}
      >
        <option value={[]}>Tous les genres</option>
        {data.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <p>En cours de chargement...</p>
  );
}
export default FilterByGenre;

FilterByGenre.propTypes = {
  setGenre: PropTypes.func.isRequired,
};
