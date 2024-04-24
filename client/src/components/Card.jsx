import { Link } from "react-router-dom";
import "./Card.scss";
import PropTypes from "prop-types";

function Card({ title, poster, overview, voteAverage, filmid }) {
  function convertToStars(average) {
    // Arrondir à l'entier le plus proche
    const roundedValue = Math.round(average);

    // Créer une chaîne d'étoiles basée sur la valeur arrondie
    const stars = "⭐".repeat(roundedValue);

    return stars;
  }

  const starsString = convertToStars(voteAverage);

  return (
    <div className="Card">
      <h1 className="Title">{title}</h1>
      <div className="contenaire">
        <img src={poster} alt="" className="Images" />
        <div className="info">
          <p className="Description">{overview}</p>
          <p>{starsString}</p>
          <div className="buttonDétail">
            <Link to={`/details/${filmid}`}>
              <button type="button">Détail</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  filmid: PropTypes.number.isRequired,
};

export default Card;
