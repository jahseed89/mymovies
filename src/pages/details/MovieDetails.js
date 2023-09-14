import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../component/index";
import { calender, des, home, logo, tvshow } from "../../assets/index";
import {BiArrowBack} from 'react-icons/bi'
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

  const navigator = useNavigate();
  const toHomePage = () => {
    navigator("/");
  };

  const convertMinutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
 
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
            <p onClick={toHomePage}>
              <img src={home} alt="logo" />
              <span>Home</span>
            </p>
            <p>
              <img src={tvshow} alt="logo" />
              <span>TV Series</span>
            </p>
            <p>
              <img src={calender} alt="logo" />
              <span>Upcoming</span>
            </p>
          </div>
          <div className="main">
             <p className="home-link">
                <BiArrowBack />
                <Link to='/'>Back</Link>
            </p>
            <h1>{movie.title}</h1>
            <div className="img-container">
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
                alt={`${movie.title} poster`}
                className="my-4"
              />
            </div>
            <div>
              <div className="date-des">
                <p>{movie.release_date}</p>
                <p>{convertMinutesToHoursAndMinutes(movie.runtime)}</p>
              </div>
              <div className="overview">
                <p>{movie.overview}</p>
                <img src={des} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
