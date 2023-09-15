import React from "react";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({

  movieCard: {
    margin: "1rem 0",
    color: "#e3e9f3de",
    borderRadius: "10px",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
  detalsP: {
    margin: "-.0.3rem 0",
    fontSize: "14px"
  },

  buttonHolder: {
    width: "30%",
    textAlign: "end",
    paddingRight: '.2rem'
  },

  button: {
    padding: ".2rem .5rem",
    backgroundColor: "#428bca",
    color: "#fff",
    border: "1px solid #428bca",
    cursor: "pointer",
    borderRadius: "5px"
  }

})

const MovieCard = ({
  poster,
  posterTitle,
  popularity,
  title,
  releaseDate,
  dataTestId,
  movieId
}) => {
    const classes = useStyles()
    const navigate = useNavigate()

    const handleDetails = () => {
        navigate(`details/${movieId}`)
    }
   
  return (
    <div className={classes.movieCard}>
      <img
        src={`https://image.tmdb.org/t/p/w300/${poster}`}
        alt={`${posterTitle} poster`}
        className="my-4"
        data-testid={dataTestId}
      />
      <div className={classes.desContainer}>
        <div className={classes.details}>
          <span data-testid={`${dataTestId}-popularity`} className={classes.detailsSpan}>{popularity}</span>
          <p data-testid={`${dataTestId}-title`} className={classes.detalsP}>{title}</p>
          <span data-testid={`${dataTestId}-release_date`} className={classes.detailsSpan}>{releaseDate}</span>
        </div>
        <div className={classes.buttonHolder}>
          <button onClick={handleDetails} className={classes.button}>Details</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
