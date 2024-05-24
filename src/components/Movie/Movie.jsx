import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';

import useStyles from './movieStyles';

const Movie = ({ movie, index }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={index} timeout={(index + 1) * 300}>
        <Link to={`/movie/${movie.id}`} className={classes.link}>
          <img
            alt={movie.title}
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : `https://www.fillmurray.com/200/300`
            }
          />

          <Typography variant="h5" className={classes.title}>
            {movie.title}
          </Typography>

          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
