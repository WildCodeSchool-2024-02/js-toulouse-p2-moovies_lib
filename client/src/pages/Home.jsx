import "./Home.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import logo from "../assets/images/logo.jpg";

function Home() {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [popularity] = useState(50);

  useEffect(() => {
    const token = import.meta.env.VITE_API_TOKEN;
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
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomNumber}&sort_by=popularity.desc&certification_country=US&certification.lte=PG-16&popularity.gte  =${minPopularity}`,
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
      <div className="présentation">
        <h2 className="ure-welcom">Bienvenue !</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
          quisquam veritatis incidunt omnis doloribus id, minima quibusdam eius
          quis ab similique totam voluptatem odio debitis. Harum voluptatem quae
          commodi rerum? Et laboriosam possimus repellendus sit commodi dicta
          quasi nobis eos facilis dolorem corrupti placeat consequuntur ex natus
          ullam, maiores magnam neque architecto cum! Distinctio, aliquid animi
          modi sed laboriosam veniam! Odit, voluptate deserunt placeat excepturi
          mollitia pariatur vero quos nihil necessitatibus sit porro reiciendis
          ab neque assumenda illo eaque doloremque quasi voluptatem nemo. Nihil
          est saepe odit, cumque aliquam optio! Laudantium sapiente molestias
          neque, fugit quaerat sed mollitia fugiat ad veniam quis laboriosam
          aperiam necessitatibus eligendi at architecto ab reprehenderit
          explicabo reiciendis voluptatem tempore magnam recusandae quidem harum
          repellat. Quas? Quos culpa ipsum omnis quas incidunt sit labore sunt
          ducimus ullam? Molestiae fuga dolorem minus ea sed beatae, quidem
          reiciendis corporis provident! Sunt, beatae? Nulla itaque animi vel
          praesentium enim.
        </p>
      </div>

      <div className="direction">
        <Link to="/search">
          <button type="button">je sais ce que je veux !</button>
        </Link>
        <Link to="/filter">
          <button type="button">Guide moi</button>
        </Link>
      </div>
      <h2 className="selection">Selection du jour!</h2>
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
        {data2 && (
          <Card
            title={data2?.original_title}
            poster={`https://image.tmdb.org/t/p/w500/${data2 && data2.poster_path}`}
            overview={data2?.overview}
            voteAverage={data2?.vote_average}
            filmid={data2?.id}
          />
        )}
      </div>
    </>
  );
}

export default Home;
