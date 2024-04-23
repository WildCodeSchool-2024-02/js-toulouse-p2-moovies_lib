import "./Home.scss";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import logo from "../assets/images/logo.jpg";

function Home() {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [popularity] = useState(50);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 100);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTJlNWZlODU2NzMxYjc5MzRhZTg2M2QzNTE4NmYwZCIsInN1YiI6IjY2MTY0NmE1YTU3OWY5MDE4NTJmZTRmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1nYbthW5RYi4ysbbbkmOaWcGeTtCgaoxu5yQuIW1R7A",
      },
    };

    const maxRating = 3;
    const userRating = 1;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomNumber}&sort_by=popularity.desc&vote_average.gte=${userRating}s&vote_average.lte=${maxRating}&certification_country=US&certification.lte=PG-16`,
          options
        );
        const fetchedData = await response.json();
        const randomMovie =
          fetchedData.results[
            Math.floor(Math.random() * fetchedData.results.length - 1)
          ];
        setData(randomMovie);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const fetchDataPop = async (minPopularity) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomNumber}&sort_by=popularity.desc&certification_country=US&certification.lte=PG-16&popularity.gte=${minPopularity}`,
          options
        );
        const fetchedData2 = await response.json();
        // ici une fonction pour prendre en fonction de la popularité
        const popularMovies = fetchedData2.results.filter(
          (movie) => movie.popularity >= minPopularity
        );

        const randomMovie2 =
          popularMovies[Math.floor(Math.random() * popularMovies.length - 1)];
        setData2(randomMovie2);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataPop(popularity);
  }, [popularity]);

  return (
    <>
      <header className="header">
        <img className="Logo" src={logo} alt="" />
        <h1 className="site">Moovies Lib</h1>
      </header>

      <div>
        <h2>Nanar</h2>
        {data && (
          <Card
            title={data?.original_title}
            poster={`https://image.tmdb.org/t/p/w500/${data && data.poster_path}`}
            overview={data?.overview}
          />
        )}
      </div>
      <div>
        <h2>Pépite</h2>
        {data2 && (
          <Card
            title={data2?.original_title}
            poster={`https://image.tmdb.org/t/p/w500/${data2 && data2.poster_path}`}
            overview={data2?.overview}
          />
        )}
      </div>
    </>
  );
}

export default Home;
