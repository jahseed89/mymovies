import axios from "axios";
import { useEffect, useState } from "react";
import { Loader, MovieCard } from "../../component/index";
import { footer } from "../../assets/index";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "./home.scss";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = process.env.REACT_APP_TMDB_KEY;

  const [savedMovie, setSavedMovie] = useState([]);

  const baseUrl = "https://api.themoviedb.org/3/movie/top_rated";
  const allMovieUrl = "https://api.themoviedb.org/3/search/movie";

  useEffect(() => {
    axios
      .get(`${baseUrl}?api_key=${apiKey}`)
      .then((response) => {
        const sortedMovies = response.data.results.slice(0, 10);

        setTopMovies(sortedMovies);
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error fetching top movies:", error);
        setIsLoading(false);
      });
  }, [apiKey]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    if (searchTerm) {
      setSearchLoading(true);
      axios
        .get(`${allMovieUrl}?api_key=${apiKey}&query=${searchTerm}`)
        .then((response) => {
          const searchResults = response.data.results;

          const filteredResults = searchResults.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
          );

          setTimeout(() => {
            setSearchLoading(false);
          }, 3000);

          setSearchedMovies(filteredResults);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setSearchLoading(false);
        });
    } else {
      setSearchedMovies([]);
      setSearchLoading(false);
    }
  };

  const navigator = useNavigate();
  const handleMovieDetails = (movieId) => {
    navigator(`movies/${movieId}`);
  };

const handleSaveClick = (movieId) => {
    if (!savedMovie.some((movie) => movie.movieId === movieId)) {
      const movieToSave = topMovies.find((movie) => movie.id === movieId);
      if (movieToSave) {
        setSavedMovie([...savedMovie, movieToSave]);
        successMsg();
      }
    }
  };

  const successMsg = () => {
    toast("Movie Saved Successfully", {
      position: "top-center",
      duration: 5000,
      style: {
        background: "#333",
        color: "#ffffff",
      },
    });
  };

  return (
    <div className="home">
      <Toaster />
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
                onChange={handleSearch}
              />
            </div>
          </div>
          <h1 className="title">Top 10 Movies</h1>
          <div className="movie-wrapper">
            {topMovies.map((movie) => (
              <div key={movie.id}>
                <MovieCard
                  data-testid="movie-card"
                  movieId={movie.id}
                  poster={movie.backdrop_path}
                  posterTitle={movie.backdrop_path}
                  popularity={movie.popularity}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  handleSaveMovie={() => handleSaveClick(movie.id)}
                />
              </div>
            ))}
          </div>
          {searchLoading ? (
            <h1 className="loading">Loading...</h1>
          ) : (
            searchTerm && (
              <div className="search-movies-container">
                <div>
                  {searchedMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="search-des"
                      onClick={() => handleMovieDetails(movie.id)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`}
                        alt={`${movie.title.slice(0, 10)} poster`}
                      />
                      <div className="titleAndDate">
                        <h3>{movie.title.slice(0, 25)}</h3>
                        <p>{movie.release_date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
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

