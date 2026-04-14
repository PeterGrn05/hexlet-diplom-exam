import React, { useState } from 'react';
import { createMovie } from '../../api/movies';

const AddMoviePopup = ({ isOpen, onClose, onMovieAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    genre: ''
  });
  const [posterFile, setPosterFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (name === 'duration') {
      const num = parseInt(value, 10);
      if (isNaN(num) || num < 1) return 'Длительность должна быть числом больше 0';
    } else if (name === 'name' || name === 'description' || name === 'genre') {
      if (!value.trim()) return 'Поле обязательно';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleFileChange = (e) => {
    setPosterFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('duration', formData.duration);
    data.append('description', formData.description);
    data.append('genre', formData.genre);
    if (posterFile) data.append('poster', posterFile);

    try {
      const newMovie = await createMovie(data);
      onMovieAdded(newMovie);
      onClose();
      setFormData({ name: '', duration: '', description: '', genre: '' });
      setPosterFile(null);
    } catch (err) {
      alert('Ошибка добавления фильма');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-wrapper">
      <div className="popup-movie popup">
        <header className="popup-header">
          <h3 className="popup-title">Добавление фильма</h3>
          <button className="popup-close" onClick={onClose}></button>
        </header>
        <form className="popup-movie-form popup-form" onSubmit={handleSubmit}>
          <label htmlFor="movie-title" className="popup-label">Название фильма</label>
          <input type="text" className="popup-input" id="movie-title" name="name" value={formData.name} onChange={handleChange} placeholder="Например, «Гражданин Кейн»" required />
          {errors.name && <div className="error-text">{errors.name}</div>}

          <label htmlFor="movie-length" className="popup-label">Продолжительность (мин.)</label>
          <input type="text" className="popup-input" id="movie-length" name="duration" value={formData.duration} onChange={handleChange} required />
          {errors.duration && <div className="error-text">{errors.duration}</div>}

          <label htmlFor="movie-description" className="popup-label">Описание</label>
          <textarea className="popup-input popup-input-description" id="movie-description" name="description" value={formData.description} onChange={handleChange} required></textarea>
          {errors.description && <div className="error-text">{errors.description}</div>}

          <label htmlFor="movie-country" className="popup-label">Жанр / Страна</label>
          <input type="text" className="popup-input" id="movie-country" name="genre" value={formData.genre} onChange={handleChange} placeholder="Например, «США, фантастика»" required />
          {errors.genre && <div className="error-text">{errors.genre}</div>}

          <div className="submit-wrapper-popup">
            <button type="submit" className="button admin-button" disabled={loading}>{loading ? 'Добавление...' : 'Добавить фильм'}</button>
            <label className="button admin-button">
              Загрузить постер
              <input type="file" className="button submit-poster-button admin-button" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
            <button type="button" className="button admin-white-button" onClick={onClose}>Отменить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMoviePopup;