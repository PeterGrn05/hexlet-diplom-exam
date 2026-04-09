import React, { useState } from 'react';

const AddHallPopup = ({ isOpen, onClose, onAddHall }) => {
  const [hallName, setHallName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hallName.trim()) {
      onAddHall(hallName.trim());
      setHallName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-wrapper">
      <div className="popup-hall popup">
        <header className="popup-header">
          <h3 className="popup-title">Добавление зала</h3>
          <button className="popup-close" onClick={onClose}></button>
        </header>
        <form className="popup-hall-form popup-form" onSubmit={handleSubmit}>
          <label htmlFor="hall-name" className="popup-label">Название зала</label>
          <input
            type="text"
            className="popup-input"
            id="hall-name"
            placeholder="Например, «Зал 1»"
            value={hallName}
            onChange={(e) => setHallName(e.target.value)}
            required
          />
          <div className="submit-wrapper-popup">
            <button type="submit" className="button admin-button">Добавить зал</button>
            <button type="button" className="button admin-white-button" onClick={onClose}>Отменить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHallPopup;