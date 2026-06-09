import React from 'react';
import { useAppContext } from '../context/AppContext';
import MovieCard from './MovieCard';
import Loader from './Loader';
import ErrorMessage from './Error';
import EmptyState from './EmptyState';

const MovieList = () => {
  const { movies, sessions, halls, selectedDate, isLoading, error } = useAppContext();

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const filteredSessions = sessions;

  // Фильмы, у которых есть хотя бы один сеанс на выбранную дату
  const moviesWithSessions = movies.filter(movie =>
    filteredSessions.some(s => s.movie === movie.id)
  );

  if (moviesWithSessions.length === 0) {
    return <EmptyState message="Нет доступных фильмов на выбранную дату" />;
  }

  return (
    <main className="client-index">
      {moviesWithSessions.map(movie => {
        const movieSessions = filteredSessions.filter(s => s.movie === movie.id);
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