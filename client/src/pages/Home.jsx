import "./Home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

function Home() {
  const [data, setData] = useState({});
  const [dataPopularity, setDataPopularity] = useState({});
  const [popularity] = useState(50);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const token = import.meta.env.VITE_MY_API_TOKEN;
    const randomNumber = Math.floor(Math.random() * 10);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const maxRating = 3;
    // const userRating = 1;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr&page=${randomNumber}&sort_by=popularity.asc&vote_average.lte=${maxRating}&vote_count.gte=20`,
          options,
        );
        const fetchedData = await response.json();
        const randomMovie =
          await fetchedData?.results[Math.floor(Math.random() * fetchedData.results.length - 1)];
        setData(randomMovie);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDataPop = async (minPopularity) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-US&page=${randomNumber}&sort_by=popularity.desc&certification_country=US&certification.lte=PG-16&popularity.gte=${minPopularity}`,
          options,
        );
        const fetchedDataPopularity = await response.json();

        // ici une fonction pour prendre en fonction de la popularité

        const popularMovies = fetchedDataPopularity.results.filter(
          (movie) => movie.popularity >= minPopularity,
        );

        const randomMoviePopularity =
          await popularMovies[Math.floor(Math.random() * popularMovies.length - 1)];
        setDataPopularity(randomMoviePopularity);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // ici mon fetch nanard
    fetchDataPop(popularity); // ici mon fetch de pepite
    setIsloading(false);
  }, []);

  return (
    <>
      <div className="presentation">
        <h2>Bienvenue sur Moovies Lib</h2>
        <h2>Votre référence cinématographique!</h2>
        <p className="description-site">
          Découvrez Moovies Lib, la plateforme ultime pour les amateurs de films et de séries,
          conçue pour explorer, évaluer et discuter de vos œuvres cinématographiques préférées.
          <br /> Inspiré par The Movie Database (TMDB), Moovies Lib offre une interface utilisateur
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
      {isLoading ? (
        <h3>En chargement</h3>
      ) : (
        <div className="container-cards">
          <div className="nanar">
            <h2 className="title-card">Le Nanar</h2>
            <Card
              originalTitle={data?.original_title}
              poster={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              overview={data?.overview}
              voteAverage={data?.vote_average}
              filmid={data?.id}
              title={data?.title}
            />
          </div>
          <div className="pepite">
            <h2 className="title-card">La Pépite</h2>
            <Card
              originalTitle={dataPopularity?.original_title}
              poster={`https://image.tmdb.org/t/p/w500/${dataPopularity?.poster_path}`}
              overview={dataPopularity?.overview}
              voteAverage={dataPopularity?.vote_average}
              filmid={dataPopularity?.id}
              title={dataPopularity?.title}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
