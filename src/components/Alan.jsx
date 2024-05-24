import React, { useContext, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ColorModeContext } from '../utils/ToggleColorMode';
import {
  selectGenreOrCategory,
  searchMovie,
} from '../features/currentGenreOrCategory';

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    alanBtn({
      key: 'fb412f206bdf1a61d4f8a9282ff9ca582e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query}) => {
        if (command === 'changeMode') {
          console.log('Changmode');
          if (mode === 'light') {
            setMode('light');
          } else {
            console.log('Here');
            setMode('dark');
          }
        } else if (command === 'chooseGenre') {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );

          if (foundGenre) {
            navigate('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith('top')
              ? 'top_rated'
              : genreOrCategory;
            navigate('/');
            dispatch(selectGenreOrCategory(category));
          }
        }else if(command === 'search'){
            dispatch(searchMovie(query));
        }
      },
    });
  }, []);

  return <div />;
};

export default useAlan;
