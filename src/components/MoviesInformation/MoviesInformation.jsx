import React, { useState } from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from '@mui/material';

import {
  Movie as MovieIcon,
  Theaters,
  Language,
  ArrowBack,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from '../../services/TMDB';
import useStyles from './movieInfoStyles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { MoviesList } from '../route';

function MoviesInformation() {
  const id = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery(id);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    <Box display="flex" justifyContent="center">
      <Link to="/">Something has gone wrong - Go Back</Link>
    </Box>;
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid
        item
        sm={12}
        lg={4}
        style={{ display: 'flex', marginBottom: '30px' }}
      >
        <img
          className={classes.poster}
          alt={data?.title}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title}({data.release_date.split('-')[0]})
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              {data.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | Language: {data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genres, id) => (
            <Link
              key={genres.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genres.id))}
            >
              <img
                alt={genres.name}
                src={genreIcons[genres.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genres?.name}
              </Typography>
            </Link>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>

        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {' '}
          Top Cast
        </Typography>

        <Grid item container spacing={2}>
          {data &&
            data.credits.cast
              .map(
                (actor, id) =>
                  actor.profile_path && (
                    <Grid
                      key={id}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${actor.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        alt={actor.name}
                      />
                      <Typography color="textPrimary">{actor?.name}</Typography>

                      <Typography color="textSecondary">
                        {actor.character.split('/')[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 12)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography
                    style={{ textDecoration: 'none' }}
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          Movies You Might Also Like
        </Typography>
        {recommendations ? (
          <MoviesList movies={recommendations} noOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>

      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            title="Trailer"
            autoplay
            className={classes.video}
            frameBorder="0"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
}

export default MoviesInformation;
