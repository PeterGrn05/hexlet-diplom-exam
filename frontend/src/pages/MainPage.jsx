import React from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import MovieList from '../components/MovieList';
import { useEffect } from 'react';

const MainPage = () => {

  useEffect(() => {
      document.body.classList.add('body-bg');
      return () => document.body.classList.remove('body-bg');
    }, []);

  return (
    <div className="content-wrapper">
      <Header />
      <Calendar />
      <MovieList />
    </div>
  );
};

export default MainPage;