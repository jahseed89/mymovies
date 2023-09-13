import axios from "axios";
import { useEffect, useState } from "react";
import { Loader, MovieCard } from "../../component/index";
import { footer } from "../../assets/index";
import "./home.scss";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const baseUrl = "https://api.themoviedb.org/3/discover/movie";

  useEffect(() => {
    axios
      .get(`${baseUrl}?api_key=${apiKey}`)
      .then((response) => {
        const sortedMovies = response.data.results.sort(
          (a, b) => b.popularity - a.popularity
        );
        const top10Movies = sortedMovies.slice(0, 10);

        setMovies(top10Movies);
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [apiKey]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <div className="top-bg">
            <div className="input-fild">
              <input
                type="text"
                placeholder="Search by movie title"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          <h1 className="title">Top 10 Movies</h1>
          <div className="movie-wrapper">
            {filteredMovies.map((movie) => {
              return (
                <div key={movie.id}>
                  <MovieCard
                    poster={movie.backdrop_path}
                    posterTitle={movie.backdrop_path}
                    popularity={movie.popularity}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    dataTestId={`movie-card-${movie.id}`}
                    movieId={movie.id}
                  />
                </div>
              );
            })}
          </div>
          <div className="footer">
            <div className="des-section">
                <img src={footer} alt="footer" />
                <p>
                    <span>Condition of Use</span>
                    <span>Privacy & Policy</span>
                    <span>Press Room</span>
                </p>
                <p>&copy; 2023 MovieBox By Samson Ocran</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
