import React from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import MovieList from '../components/MovieList';

const MainPage = () => {
  return (
    <div className="content-wrapper">
        <Header />
        <Calendar />
        <MovieList />
    </div>
  );
};

export default MainPage;