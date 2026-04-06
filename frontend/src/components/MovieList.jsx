import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import MovieCard from './MovieCard';

const MovieList = () => {
  const { movies, sessions, halls, selectedDate } = useContext(AppContext);

  // Группируем сеансы по фильмам
  const getSessionsByMovie = (movieId) => {
    return sessions.filter(s => s.movie === movieId);
  };

  return (
    <main className="client-index">
      {movies.map(movie => {
        const movieSessions = getSessionsByMovie(movie.id);
        if (movieSessions.length === 0) return null;
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            sessions={movieSessions}
            halls={halls}
            selectedDate={selectedDate}
          />
        );
      })}
    </main>
  );
};

export default MovieList;