import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, sessions, halls, selectedDate }) => {
  const navigate = useNavigate();

  const sessionsByHall = sessions.reduce((acc, sess) => {
    if (!acc[sess.hall]) acc[sess.hall] = [];
    acc[sess.hall].push(sess);
    return acc;
  }, {});

  const handleSeanceClick = (seanceId, hallId, time) => {
    localStorage.setItem('seanceId', seanceId);
    localStorage.setItem('seanceHallId', hallId);
    localStorage.setItem('seanceTime', time);
    localStorage.setItem('filmTitle', movie.name);
    localStorage.setItem('pickedDate', selectedDate);
    navigate('/booking');
  };

  return (
    <article className="movie">
      <div className="movie-info">
        <img src={movie.poster} alt={movie.name} className="movie-image" />
        <div className="movie-description">
          <h2 className="movie-title">{movie.name}</h2>
          <p className="movie-synopsis">{movie.description}</p>
          <div className="movie-data">
            <p className="movie-length">{movie.duration} минут</p>
            <p className="movie-country">{movie.genre}</p>
          </div>
        </div>
      </div>
      <div className="movie-schedule">
        {Object.entries(sessionsByHall).map(([hallId, hallSessions]) => {
          const hall = halls.find(h => h.id === hallId);
          if (!hall) return null;
          const sorted = [...hallSessions].sort((a, b) => a.start_time.localeCompare(b.start_time));
          return (
            <div key={hallId} className="movie-halls" data-id={hallId}>
              <h3 className="movie-halls-title">{hall.name}</h3>
              <ul className="movie-halls-times">
                {sorted.map(sess => {
                  const time = new Date(sess.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  // проверка на прошедшее время (можно добавить)
                  const isDisabled = false;
                  return (
                    <li
                      key={sess.id}
                      className={`movie-halls-time ${isDisabled ? 'movie-halls-time-disabled' : ''}`}
                      onClick={() => !isDisabled && handleSeanceClick(sess.id, hall.id, time)}
                    >
                      {time}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default MovieCard;