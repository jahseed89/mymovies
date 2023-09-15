import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({

  movieCard: {
    margin: "1rem 0",
    color: "#e3e9f3de",
    borderRadius: "10px",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  },

  movieCardImg: {
    cursor: "pointer"
  },

  desContainer: {
    width: "300px",
    display: 'flex',
    justifyContent: 'space-between',
  },

  details: {
    display: "flex",
    flexDirection: 'column',
    width: '70%',
    padding: '0 .5rem',
  },
  detailsSpan: {
    color: "#9CA3AF",
    fontSize: '14px'
  },
  detalsH3: {
    margin: "-.0.3rem 0",
    fontSize: "14px",
    fontWeight: "bold",
    color: "black"
  },

  buttonHolder: {
    width: "30%",
    textAlign: "end",
    paddingRight: '.2rem',
    zIndex: "100",
  },

  button: {
    padding: ".2rem .5rem",
    backgroundColor: "#428bca",
    color: "#fff",
    border: "1px solid #428bca",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "12px",
  },
})

const MovieCard = ({
  poster,
  posterTitle,
  popularity,
  title,
  releaseDate,
  movieId
}) => {
    const classes = useStyles()
    const navigate = useNavigate()
    
    const [savedMovie, setSavedMovie] = useState([])

    const handleDetails = () => {
        navigate(`details/${movieId}`)
    }

    const handleSaveMovie = () => {
      if(savedMovie.some(movie => movie.movieId === movieId)) {
        setSavedMovie([...savedMovie, {savedMovie, title}])
      }
      
    }
   
  return (
    <div data-testid="movie-card" className={classes.movieCard}>
      <img
        src={`https://image.tmdb.org/t/p/w300/${poster}`}
        alt={`${posterTitle} poster`}
        data-testid="movie-poster"
        onClick={handleDetails}
        className={classes.movieCardImg}
      />
      <div className={classes.desContainer}>
        <div className={classes.details}>
          <span data-testid="popularity" className={classes.detailsSpan}>{popularity}</span>
          <h3 data-testid="movie-title" className={classes.detalsH3}>{title}</h3>
          <span data-testid="movie-release-date" className={classes.detailsSpan}>{releaseDate}</span>
        </div>
        <div className={classes.buttonHolder}>
          <button onClick={handleSaveMovie} className={classes.button}>Saved Movie</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
