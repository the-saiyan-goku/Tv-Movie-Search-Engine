import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './moviesListStyles';
import { Movie } from '../route';

function MoviesList({ movies, noOfMovies, excludeFirst }) {
  const classes = useStyles();
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(startFrom, noOfMovies).map((movie, index) => (
        <Movie key={index} movie={movie} index={index} />
      ))}
    </Grid>
  );
}

export default MoviesList;
