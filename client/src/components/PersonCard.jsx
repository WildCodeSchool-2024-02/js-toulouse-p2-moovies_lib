import { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../contexts/ThemeContext";
import "./PersonCard.scss";

function PersonCard({ person }) {
  const { theme } = useContext(ThemeContext);
  const { character, name, job } = person;
  const noInformations = "Information non disponible";
  return (
    <div className={`themed-fiche ${theme} person-container`}>
      <div className="person-description">
        <p>
          {job ? `Job : ` : `Role : `}
          {job ? (
            <span>{job}</span>
          ) : (
            <span>{character || <em>{noInformations}</em>}</span>
          )}
        </p>
        <p>
          Nom : <span>{name}</span>{" "}
        </p>
      </div>
      {person.profile_path ? (
        <>
          <br />{" "}
          <div className="person-img-container">
            <img
              className="person-img"
              src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
              alt={`img-person-${person.profile_path}`}
            />
          </div>
        </>
      ) : (
        <div className="person-img-container">
          <svg width="80" height="80">
            <circle cx="50%" cy="50%" r="50%" fill="#aeaeae" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="white"
              fontSize="2rem"
              fontFamily="Arial"
              dy=".3em"
            >
              {name
                .split(" ")
                .map((w) => w.charAt(0))
                .join("")}
            </text>
          </svg>
        </div>
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
