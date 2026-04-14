import React, { useState, useEffect } from 'react';
import AddMoviePopup from '../../components/Admin/MoviePopup';
import AddSessionPopup from '../../components/Admin/SessionsPopup';
import { fetchMovies, fetchHalls, fetchSessions, deleteMovie, deleteSession } from '../../api/movies';


const SessionsGrid = () => {
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMoviePopupOpen, setIsMoviePopupOpen] = useState(false);
  const [isSessionPopupOpen, setIsSessionPopupOpen] = useState(false);
  const [draggedMovieId, setDraggedMovieId] = useState(null);
  const [draggedSession, setDraggedSession] = useState(null); // { id, hallId }

  const loadData = async () => {
    setLoading(true);
    try {
      const [moviesData, hallsData, sessionsData] = await Promise.all([
        fetchMovies(),
        fetchHalls(),
        fetchSessions()
      ]);
      setMovies(moviesData);
      setHalls(hallsData);
      setSessions(sessionsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm('Удалить фильм? Все связанные сеансы также будут удалены.')) {
      try {
        await deleteMovie(movieId);
        await loadData();
      } catch (err) {
        alert('Ошибка удаления фильма');
      }
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (window.confirm('Удалить сеанс?')) {
      try {
        await deleteSession(sessionId);
        await loadData();
      } catch (err) {
        alert('Ошибка удаления сеанса');
      }
    }
  };

  // Drag & Drop для фильмов (добавление сеанса)
  const handleMovieDragStart = (movieId) => (e) => {
    setDraggedMovieId(movieId);
    e.dataTransfer.setData('text/plain', movieId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleMovieDragEnd = () => {
    setDraggedMovieId(null);
  };

  const handleTimelineDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleTimelineDrop = (hallId) => (e) => {
    e.preventDefault();
    if (draggedMovieId) {
      localStorage.setItem('preSelectedMovieId', draggedMovieId);
      setIsSessionPopupOpen(true);
      setDraggedMovieId(null);
    }
  };

  // Drag & Drop для сеансов (удаление)
  const handleSessionDragStart = (sessionId, hallId) => (e) => {
    setDraggedSession({ id: sessionId, hallId });
    e.dataTransfer.setData('text/plain', sessionId);
    e.dataTransfer.effectAllowed = 'move';
    // Показать кнопку удаления для данного зала
    const deleteBtn = document.getElementById(`delete-btn-${hallId}`);
    if (deleteBtn) deleteBtn.classList.remove('visually-hidden');
  };

  const handleSessionDragEnd = (hallId) => (e) => {
    setDraggedSession(null);
    // Скрыть кнопку удаления
    const deleteBtn = document.getElementById(`delete-btn-${hallId}`);
    if (deleteBtn) deleteBtn.classList.add('visually-hidden');
  };

  const handleDeleteZoneDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDeleteZoneDrop = (hallId) => async (e) => {
    e.preventDefault();
    if (draggedSession && draggedSession.hallId === hallId) {
      await handleDeleteSession(draggedSession.id);
      setDraggedSession(null);
      // Скрыть кнопку после удаления
      const deleteBtn = document.getElementById(`delete-btn-${hallId}`);
      if (deleteBtn) deleteBtn.classList.add('visually-hidden');
    }
  };

  // Получение сеансов для зала
  const getSessionsForHall = (hallId) => {
    return sessions.filter(s => s.hall === hallId);
  };

  // Вычисление стилей для блока сеанса (позиция и ширина)
  const getSessionStyle = (session) => {
    const movie = movies.find(m => m.id === session.movie);
    if (!movie) return { left: '0%', width: '0%' };
    const duration = parseInt(movie.duration, 10) || 90; // длительность в минутах
    const start = new Date(session.start_time);
    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const dayStart = 10 * 60; // 10:00
    const dayEnd = 24 * 60;   // 00:00
    const totalMinutes = dayEnd - dayStart;
    const left = ((startMinutes - dayStart) / totalMinutes) * 100;
    const width = (duration / totalMinutes) * 100;
    return {
      left: `${Math.max(0, left)}%`,
      width: `${Math.min(width, 100 - left)}%`,
    };
  };

  // Цвет фона сеанса (берём цвет из карточки фильма)
  const getSessionColor = (movieId) => {
    const index = movies.findIndex(m => m.id === movieId);
    const colors = ['#CAFF85', '#85FF89', '#85FFD3', '#85E2FF', '#8599FF'];
    return colors[index % colors.length];
  };

  if (loading) return <div className="manage-content">Загрузка...</div>;

  return (
    <section>
      <header className="section-header">
        <h2 className="section-title">Сетка сеансов</h2>
        <button className="section-header-button"></button>
      </header>
      <div className="manage-content">
        <button className="button admin-button" onClick={() => setIsMoviePopupOpen(true)}>
          Добавить фильм
        </button>

        {/* Список фильмов (левая колонка) */}
        <ul className="admin-sessions-movie-list">
          {movies.map(movie => (
            <li
              key={movie.id}
              className="admin-sessions-movie-list-item"
              draggable
              onDragStart={handleMovieDragStart(movie.id)}
              onDragEnd={handleMovieDragEnd}
            >
              <img
                src={movie.poster || '/placeholder.png'}
                alt={movie.name}
                className="admin-sessions-movie-image"
              />
              <div className="admin-sessions-movie-info">
                <p className="admin-sessions-movie-title">{movie.name}</p>
                <p className="admin-sessions-movie-length">{movie.duration} минут</p>
              </div>
              <button
                className="admin-delete-button admin-delete-button-sessions"
                onClick={() => handleDeleteMovie(movie.id)}
              />
            </li>
          ))}
        </ul>

        {/* Список залов с временными линиями */}
        <ol className="admin-sessions-halls-list">
          {halls.map(hall => {
            const hallSessions = getSessionsForHall(hall.id);
            return (
              <li key={hall.id} className="admin-sessions-halls-list-item" style={{ position: 'relative' }}>
                <h3 className="admin-sessions-halls-title">{hall.name}</h3>
                <div
                  className="admin-sessions-halls-timeline"
                  onDragOver={handleTimelineDragOver}
                  onDrop={handleTimelineDrop(hall.id)}
                >
                  {hallSessions.map(session => {
                    const style = getSessionStyle(session);
                    const bgColor = getSessionColor(session.movie);
                    return (
                      <div
                        key={session.id}
                        className="admin-sessions-session-wrapper"
                        style={{ ...style, backgroundColor: bgColor }}
                        draggable
                        onDragStart={handleSessionDragStart(session.id, hall.id)}
                        onDragEnd={handleSessionDragEnd(hall.id)}
                      >
                        <div className="admin-sessions-session">
                          <p className="admin-sessions-session-title">
                            {movies.find(m => m.id === session.movie)?.name || ''}
                          </p>
                        </div>
                        <p className="admin-sessions-session-time">
                          {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {/* Кнопка удаления (корзина) для сеансов данного зала */}
                <div
                  id={`delete-btn-${hall.id}`}
                  className="admin-delete-button admin-sessions-session-delete visually-hidden"
                  onDragOver={handleDeleteZoneDragOver}
                  onDrop={handleDeleteZoneDrop(hall.id)}
                />
              </li>
            );
          })}
        </ol>

        <div className="admin-buttons">
          <button className="button admin-white-button">Отменить</button>
          <button className="button admin-button">Сохранить</button>
        </div>
      </div>

      <AddMoviePopup
        isOpen={isMoviePopupOpen}
        onClose={() => setIsMoviePopupOpen(false)}
        onMovieAdded={loadData}
      />
      <AddSessionPopup
        isOpen={isSessionPopupOpen}
        onClose={() => {
          setIsSessionPopupOpen(false);
          localStorage.removeItem('preSelectedMovieId');
        }}
        onSessionAdded={loadData}
        preSelectedMovieId={localStorage.getItem('preSelectedMovieId')}
      />
    </section>
  );
};

export default SessionsGrid;