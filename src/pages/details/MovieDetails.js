import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../component/index";
import { home, logo, movies } from "../../assets/index";
import "./movieDetails.scss";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const baseUrl = "https://api.themoviedb.org/3/movie";

  useEffect(() => {
    axios
      .get(`${baseUrl}/${movieId}?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setIsLoading(false);
      });
  }, [movieId, apiKey]);

  return (
    <div className="details">
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="details-container">
          <div className="nav">
            <p>
              <img src={logo} alt="logo" />
            </p>
            <p>
              <img src={home} alt="logo" />
            </p>
            <p>
              <img src={movies} alt="logo" />
            </p>
          </div>
          <div className="main">
            <h1>{movie.title}</h1>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
                alt={`${movie.title} poster`}
                className="my-4"
              />
            </div>
            <div>
              <div>
                <p>{movie.release_date}</p>
                <p>{movie.runtime}</p>
              </div>
              <p>{movie.overview}</p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
