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
    <div className="details-container">
      <h1>{fetchResults.original_title}</h1>
      {fetchResults.original_title !== fetchResults.title && <em>{fetchResults.title}</em>}
      <h2>Détails</h2>
      <div className="details-container-fiche">
        <img
          className="cover"
          src={`https://image.tmdb.org/t/p/w500/${fetchResults.poster_path}`}
          alt={`cover-${fetchResults.original_title}`}
        />
        <div className="fiche-informations">
          <ul>
            <li>
              <div>Genre : </div>
              <div>
                {fetchResults.genres?.map((genre, i, arr) =>
                  i === arr.length - 1 ? genre.name : `${genre.name}, `,
                )}
              </div>
            </li>
            <li>
              <div>Durée :</div> <div>{fetchResults.runtime} minutes</div>
            </li>
            <li>
              <div>Version originale : </div>
              <div>
                {fetchResults.spoken_languages?.map((language, i, arr) => {
                  const displayName = new Intl.DisplayNames("fr", { type: "language" }).of([
                    language.iso_639_1,
                  ]);
                  return i === arr.length - 1 ? displayName : `${displayName}, `;
                })}
              </div>
            </li>
            <li>
              <div>Date de sortie :</div>
              <div>{fetchResults.release_date?.split("-").reverse().join("-")}</div>
            </li>
          </ul>
          <ul>
            <li>
              <div>Note moyenne :</div> <div>{fetchResults.vote_average}/10</div>
            </li>
            <li>
              <div>Nombre de votants :</div>
              <div>{fetchResults.vote_count}</div>
            </li>
            <li>
              <div>Score de popularité : </div>
              <div>
                {fetchResults.popularity} <em>{scalingRate()}</em>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div>Réalisation : </div> <div>{fetchResults.credits?.crew[0]?.name} </div>
            </li>

            <li>
              <div>Société de production : </div>
              <div>
                {fetchResults.production_companies?.map((companie, i, arr) =>
                  i === arr.length - 1 ? companie.name : `${companie.name}, `,
                )}
              </div>
            </li>
            <li>
              <div> Pays d'origine : </div>
              <div>
                {fetchResults.origin_country?.map((country, i, arr) => {
                  const regionName = new Intl.DisplayNames(["fr"], { type: "region" }).of(country);
                  return i === arr.length - 1 ? regionName : `${regionName}, `;
                })}{" "}
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div> Budget : </div>
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
              <div> Revenus : </div>
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
        </div>
        <div className="synopsis">
          <h3>Synopsis</h3>
          <p>{fetchResults.overview || <em>{noInformations}</em>}</p>
        </div>
      </div>
      <div className="crew-casting-container">
        <h3>Casting principal</h3>
        <div className="crew-casting">
          {fetchResults.credits?.cast?.map((acteur, i) =>
            moreCasting ? (
              <PersonCard person={acteur} key={acteur.credit_id} />
            ) : (
              i < 4 && <PersonCard person={acteur} key={acteur.credit_id} />
            ),
          )}
        </div>
        <button type="button" onClick={() => setMoreCasting(!moreCasting)}>
          {moreCasting ? "Voir moins" : "Voir plus"}
        </button>
      </div>

      <div className="crew-casting-container">
        <h3>Equipe</h3>
        <div className="crew-casting">
          {fetchResults.credits?.crew.map((crew, i) =>
            moreCrew ? (
              <PersonCard person={crew} key={crew.credit_id} />
            ) : (
              i < 4 && <PersonCard person={crew} key={crew.credit_id} />
            ),
          )}
        </div>{" "}
        <button type="button" onClick={() => setMoreCrew(!moreCrew)}>
          {moreCrew ? "Voir moins" : "Voir plus"}
        </button>
      </div>
    </div>
  );
}

export default Details;
