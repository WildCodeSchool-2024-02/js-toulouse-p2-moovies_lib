import "./Home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

function Home() {
  const [data, setData] = useState();
  const [dataPopularity, setDataPopularity] = useState();
  const [popularity] = useState(50);

  useEffect(() => {
    const token = import.meta.env.VITE_MY_API_TOKEN;
    const randomNumber = Math.floor(Math.random() * 100);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const maxRating = 3;
    const userRating = 1;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomNumber}&sort_by=popularity.desc&vote_average.gte=${userRating}s&vote_average.lte=${maxRating}&certification_country=US&certification.lte=PG-16`,
          options,
        );
        const fetchedData = await response.json();
        const randomMovie =
          fetchedData.results[Math.floor(Math.random() * fetchedData.results.length - 1)];
        setData(randomMovie);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const fetchDataPop = async (minPopularity) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomNumber}&sort_by=popularity.desc&certification_country=US&certification.lte=PG-16&popularity.gte  =${minPopularity}`,
          options,
        );
        const fetchedDataPopularity = await response.json();

        // ici une fonction pour prendre en fonction de la popularité

        const popularMovies = fetchedDataPopularity.results.filter(
          (movie) => movie.popularity >= minPopularity,
        );

        const randomMoviePopularity =
          popularMovies[Math.floor(Math.random() * popularMovies.length - 1)];
        setDataPopularity(randomMoviePopularity);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataPop(popularity);
  }, [popularity]);

  return (
    <>
      <div className="presentation">
        <h2>Bienvenue sur Moovies Lib - Votre référence cinématographique!</h2>
        <p>
          Découvrez Moovies Lib, la plateforme ultime pour les amateurs de films et de séries,
          conçue pour explorer, évaluer et discuter de vos œuvres cinématographiques préférées.
          Inspiré par The Movie Database (TMDB), Moovies Lib offre une interface utilisateur
          élégante et intuitive qui permet aux cinéphiles de naviguer facilement à travers une vaste
          base de données de films et de séries TV.
        </p>
      </div>

      <div className="direction">
        <Link to="/search">
          <button type="button">Je sais ce que je veux !</button>
        </Link>
        <Link to="/filter">
          <button type="button">Guide moi</button>
        </Link>
      </div>

      <h2 className="selection">Sélection du jour!</h2>
      <div className="container-cards">
        <div>
          <h2 className="title-card">Nanar</h2>
          {data && (
            <Card
              title={data?.original_title}
              poster={`https://image.tmdb.org/t/p/w500/${data && data.poster_path}`}
              overview={data?.overview}
              voteAverage={data?.vote_average}
              filmid={data?.id}
            />
          )}
        </div>
        <div>
          <h2 className="title-card">Pépite</h2>
          {dataPopularity && (
            <Card
              title={dataPopularity?.original_title}
              poster={`https://image.tmdb.org/t/p/w500/${dataPopularity && dataPopularity.poster_path}`}
              overview={dataPopularity?.overview}
              voteAverage={dataPopularity?.vote_average}
              filmid={dataPopularity?.id}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
