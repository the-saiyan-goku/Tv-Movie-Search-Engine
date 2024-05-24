import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import useStyles from './useStyles';
import {
  Actors,
  Movies,
  MoviesInformation,
  Navbar,
} from './components/route';
import useAlan from './components/Alan';

function App() {
  const classes = useStyles();
  const alanBtnContainer = useRef();

  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolkit} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/movie/:id" element={<MoviesInformation />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
}

export default App;
