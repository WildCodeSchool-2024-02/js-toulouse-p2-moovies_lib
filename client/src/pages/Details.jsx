import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PersonCard from "../components/PersonCard";
import "./Details.scss";

function Details() {
  const token = import.meta.env.VITE_MY_API_TOKEN;
  const { filmid } = useParams();
  const [fetchResults, setFetchResults] = useState({});
  const [moreCrew, setMoreCrew] = useState(false);
  const [moreCasting, setMoreCasting] = useState(false);
  const noInformations = "Information non disponible";

  const scalingRate = () => {
    let comment = "";
    switch (true) {
      case fetchResults.popularity < 2:
        comment = "💩 Impopulaire";
        break;
      case fetchResults.popularity < 10:
        comment = "😐 Peu populaire";
        break;
      case fetchResults.popularity < 50:
        comment = "👍 Assez populaire";
        break;
      case fetchResults.popularity < 500:
        comment = "🙂 Populaire";
        break;
      case fetchResults.popularity < 1500:
        comment = "😄 Très populaire";
        break;
      case fetchResults.popularity > 1500:
        comment = "😍 Extremement populaire";
        break;
      default:
        comment = "";
    }
    return comment;
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${filmid}?append_to_response=credits&language=fr`,
      options,
    )
      .then((r) => r.json())
      .then((data) => setFetchResults(data));
  }, []);

  return (
    <>
      <h1>{fetchResults.original_title}</h1>
      {fetchResults.original_title !== fetchResults.title && <em>{fetchResults.title}</em>}
      <h2>Details</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500/${fetchResults.poster_path}`}
        alt={`cover-${fetchResults.original_title}`}
      />

      <ul>
        <li>
          Genre :{" "}
          {fetchResults.genres?.map((genre, i, arr) =>
            i === arr.length - 1 ? genre.name : `${genre.name}, `,
          )}
        </li>
        <li>Durée : {fetchResults.runtime} minutes</li>
        <li>
          Version originale :{" "}
          {fetchResults.spoken_languages?.map((language, i, arr) => {
            const displayName = new Intl.DisplayNames("fr", { type: "language" }).of([
              language.iso_639_1,
            ]);
            return i === arr.length - 1 ? displayName : `${displayName}, `;
          })}
        </li>
        <li>Date de sortie : {fetchResults.release_date?.split("-").reverse().join("-")}</li>
      </ul>
      <ul>
        <li>Note moyenne : {fetchResults.vote_average}/10</li>
        <li>Nombre de votants : {fetchResults.vote_count}</li>
        <li>
          Score de popularité : {fetchResults.popularity} <em>{scalingRate()}</em>
        </li>
      </ul>
      <ul>
        <li>Réalisation : {fetchResults.credits?.crew[0].name}</li>
        <li>
          Société de production :{" "}
          {fetchResults.production_companies?.map((companie, i, arr) =>
            i === arr.length - 1 ? companie.name : `${companie.name}, `,
          )}
        </li>
        <li>
          Pays d'origine :{" "}
          {fetchResults.origin_country?.map((country, i, arr) => {
            const regionName = new Intl.DisplayNames(["fr"], { type: "region" }).of(country);
            return i === arr.length - 1 ? regionName : `${regionName}, `;
          })}
        </li>
      </ul>
      <ul>
        {" "}
        <li>
          Budget :{" "}
          {fetchResults.revenue > 0 ? (
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "usd",
              currencyDisplay: "narrowSymbol",
            }).format(fetchResults.budget)
          ) : (
            <em>{noInformations}</em>
          )}
        </li>
        <li>
          Revenus :{" "}
          {fetchResults.revenue > 0 ? (
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "usd",
              currencyDisplay: "narrowSymbol",
            }).format(fetchResults.revenue)
          ) : (
            <em>{noInformations}</em>
          )}
        </li>
      </ul>
      <h3>Synopsis</h3>
      <p>{fetchResults.overview || <em>{noInformations}</em>}</p>
      <h3>Casting principal</h3>
      <div className="casting">
        {fetchResults.credits?.cast.map((acteur, i) =>
          moreCasting ? (
            <PersonCard person={acteur} key={acteur.credit_id} />
          ) : (
            i < 4 && <PersonCard person={acteur} key={acteur.credit_id} />
          ),
        )}
        <button type="button" onClick={() => setMoreCasting(!moreCasting)}>
          {moreCasting ? "Voir moins" : "Voir plus"}
        </button>
      </div>
      <h3>Equipe</h3>
      <div className="casting">
        {fetchResults.credits?.crew.map((crew, i) =>
          moreCrew ? (
            <PersonCard person={crew} key={crew.credit_id} />
          ) : (
            i < 4 && <PersonCard person={crew} key={crew.credit_id} />
          ),
        )}
        <button type="button" onClick={() => setMoreCrew(!moreCrew)}>
          {moreCrew ? "Voir moins" : "Voir plus"}
        </button>
      </div>
    </>
  );
}

export default Details;
