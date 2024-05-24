/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit';

import { tmdbApi } from '../services/TMDB';
import currentGenreOrCategory from '../features/currentGenreOrCategory';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
