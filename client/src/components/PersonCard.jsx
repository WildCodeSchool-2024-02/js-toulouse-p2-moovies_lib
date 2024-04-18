import "./PersonCard.scss";
import PropTypes from "prop-types";

function PersonCard({ person }) {
  const { character, name, job } = person;
  const noInformations = "Information non disponible";
  return (
    <div className="person-container">
      <div className="person-description">
        <p>
          {job ? `Job : ` : `Role : `}
          {job ? <span>{job}</span> : <span>{character || <em>{noInformations}</em>}</span>}
        </p>
        <p>
          Nom : <span>{name}</span>{" "}
        </p>
      </div>
      {person.profile_path && (
        <>
          <br />{" "}
          <img
            className="person-img"
            src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
            alt={`img-person-${person.profile_path}`}
          />
        </>
      )}
    </div>
  );
}
PersonCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    job: PropTypes.string,
    character: PropTypes.string,
    profile_path: PropTypes.string,
  }).isRequired,
};

export default PersonCard;
