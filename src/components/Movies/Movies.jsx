import React, { useState } from 'react';
import { FeaturedMovie, MoviesList, Pagination } from '../route';
import { useGetMoviesQuery } from '../../services/TMDB';
import { useSelector } from 'react-redux';

import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 15 : 19;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" sx={{ bgcolor: '#D9008D' }} />
      </Box>
    );
  }

  if (!data?.results?.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies found.
          <br />
          Please Search Something else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return 'An error has occured.';
  }

  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MoviesList movies={data} noOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  );
}

export default Movies;
