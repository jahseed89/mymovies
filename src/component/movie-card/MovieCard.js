import React from "react";
import "./movieCard.scss";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  poster,
  posterTitle,
  popularity,
  title,
  releaseDate,
  dataTestId,
  movieId
}) => {

    const navigate = useNavigate()

    const handleDetails = () => {
        navigate(`details/${movieId}`)
    }
   
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w300/${poster}`}
        alt={`${posterTitle} poster`}
        className="my-4"
        data-testid={dataTestId}
      />
      <div className="des-container">
        <div className="details">
          <span data-testid={`${dataTestId}-popularity`}>{popularity}</span>
          <p data-testid={`${dataTestId}-title`}>{title}</p>
          <span data-testid={`${dataTestId}-release_date`}>{releaseDate}</span>
        </div>
        <div className="button-holder">
          <button onClick={handleDetails}>Details</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
