import "./Card.scss";
import PropTypes from "prop-types";

function Card({ title, poster, overview }) {
  return (
    <div className="Card">
      <h1 className="Title">{title}</h1>
      <div className="contenaire">
        <img src={poster} alt="" className="Images" />
        <p className="Description">{overview}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
};

export default Card;
