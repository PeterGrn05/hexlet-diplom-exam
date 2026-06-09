import React, { useState, useEffect } from 'react';
import { createSession, fetchHalls, fetchMovies } from '../../api/movies';

const AddSessionPopup = ({ isOpen, onClose, onSessionAdded, preSelectedMovieId }) => {
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({ hall: '', movie: '', start_time: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      Promise.all([fetchHalls(), fetchMovies()])
        .then(([hallsData, moviesData]) => {
          setHalls(hallsData);
          setMovies(moviesData);
          if (preSelectedMovieId) {
            setFormData(prev => ({ ...prev, movie: preSelectedMovieId }));
          }
        })
        .catch(console.error);
    }
  }, [isOpen, preSelectedMovieId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.hall || !formData.movie || !formData.start_time) {
      alert('Заполните все поля');
      return;
    }
    setLoading(true);
    try {
      const now = new Date();
      const [hours, minutes] = formData.start_time.split(':');
      now.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      
      const dateTimeISO = now.toISOString();
      
      const newSession = await createSession({
        hall: formData.hall,
        movie: formData.movie,
        start_time: dateTimeISO
      });
      onSessionAdded(newSession);
      onClose();
      setFormData({ hall: '', movie: '', start_time: '' });
    } catch (err) {
      console.error(err);
      alert('Ошибка добавления сеанса');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-wrapper">
      <div className="popup-session popup">
        <header className="popup-header">
          <h3 className="popup-title">Добавление сеанса</h3>
          <button className="popup-close" onClick={onClose}></button>
        </header>
        <form className="popup-session-form popup-form" onSubmit={handleSubmit}>
          <label htmlFor="hall-select" className="popup-label">Зал</label>
          <select name="hall" id="hall-select" className="popup-input popup-input-select" value={formData.hall} onChange={handleChange} required>
            <option value="">Выберите зал</option>
            {halls.map(hall => <option key={hall.id} value={hall.id}>{hall.name}</option>)}
          </select>

          <label htmlFor="movie-select" className="popup-label">Фильм</label>
          <select name="movie" id="movie-select" className="popup-input popup-input-select" value={formData.movie} onChange={handleChange} required>
            <option value="">Выберите фильм</option>
            {movies.map(movie => <option key={movie.id} value={movie.id}>{movie.name}</option>)}
          </select>

          <label htmlFor="time-select" className="popup-label">Время начала</label>
          <input type="time" className="popup-input" id="time-select" name="start_time" value={formData.start_time} onChange={handleChange} required />

          <div className="submit-wrapper-popup">
            <button type="submit" className="button admin-button" disabled={loading}>{loading ? 'Добавление...' : 'Добавить сеанс'}</button>
            <button type="button" className="button admin-white-button" onClick={onClose}>Отменить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSessionPopup;