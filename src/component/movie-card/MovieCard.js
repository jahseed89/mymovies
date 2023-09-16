import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => {
console.log(theme, 'theme')
  return {
  movieCard: {
    width: "100%",
    margin: "1rem 0",
    color: theme.colors.blue,
    borderRadius: "10px",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
  },

  movieCardImg: {
    cursor: "pointer",
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
    color: theme.colors.blue,
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
    backgroundColor: theme.colors.blue,
    color: "#fff",
    border: `1px solid ${theme.colors.blue}`,
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "12px",
  },
  'button:disabled': {
    backgroundColor: "#000000",
    color: "white",
  },
  buttonSaved: {
    padding: ".2rem .5rem",
    backgroundColor: "black",
    color: "white",
    border: "1px solid black",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "12px",
  },
}})

const MovieCard = ({
  poster,
  posterTitle,
  popularity,
  title,
  releaseDate,
  movieId,
  handleSaveMovie
}) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
    const classes = useStyles()
    const navigate = useNavigate()

    

    const handleDetails = () => {
        navigate(`details/${movieId}`)
    }

    const handleSaveButtonClick = () => {
      if (!isButtonClicked) {
        handleSaveMovie(movieId);
        setIsButtonClicked(true);
      }
    };
   
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
          {/* <button onClick={() => handleSaveMovie(movieId)} className={classes.button}>Save Movie</button> */}
          <button
          onClick={handleSaveButtonClick}
          className={isButtonClicked ? classes.buttonSaved : classes.button}
          disabled={isButtonClicked}
        >
          {isButtonClicked ? "Movie Saved" : "Save Movie"}
        </button>

        </div>
      </div>
    </div>
  );
};

export default MovieCard;
