import { Link } from "react-router-dom";
import "./Card.scss";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function Card({ originalTitle, poster, overview, voteAverage, title, filmid }) {
  const { theme } = useContext(ThemeContext);
  const noInformations = "Information non disponible";

  function convertToStars(average) {
    const roundedValue = Math.round(average);

    const stars = "⭐".repeat(roundedValue);

    return stars;
  }

  const starsString = convertToStars(voteAverage);

  return (
    <div className={`themed-fiche ${theme} card`}>
      <h1 className="title">{originalTitle}</h1>
      {originalTitle !== title && <em>{title}</em>}
      <div className="container-card">
        <img src={poster} alt="" className="images" />
        <div className="info">
          <p className="description">{overview || <em className="noinfo">{noInformations}</em>}</p>
          <p className="vote">vote : </p>
          <p className="stars">{starsString}</p>
          <div className="details-btn">
            <Link to={`/details/${filmid}`}>
              <button type="button" className={`themed-button-in-card ${theme}`}>
                Détails
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  originalTitle: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  filmid: PropTypes.number.isRequired,
};

export default Card;
