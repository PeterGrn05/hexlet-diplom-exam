import React, { useState, useEffect } from 'react';
import { fetchHalls, createHall, deleteHall } from '../../api/halls';
import AddHallPopup from './HallPopup';

const HallsManagement = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const loadHalls = async () => {
    setLoading(true);
    try {
      const data = await fetchHalls();
      setHalls(data);
      setError(null);
    } catch (err) {
      console.error('Ошибка загрузки залов:', err);
      setError('Не удалось загрузить список залов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHalls();
  }, []);

  const handleAddHall = async (hallName) => {
    try {
      const newHall = await createHall(hallName);
      setHalls(prev => [...prev, newHall]);
    } catch (err) {
      console.error('Ошибка создания зала:', err);
      alert('Не удалось создать зал');
    }
  };

  const handleDeleteHall = async (hallId) => {
    if (window.confirm('Удалить зал? Все связанные сеансы также будут удалены.')) {
      try {
        await deleteHall(hallId);
        setHalls(prev => prev.filter(hall => hall.id !== hallId));
      } catch (err) {
        console.error('Ошибка удаления зала:', err);
        alert('Не удалось удалить зал');
      }
    }
  };

  return (
    <section>
      <header className="section-header">
        <h2 className="section-title">Управление залами</h2>
        <button className="section-header-button"></button>
      </header>
      <div className="manage-content">
        <div className="admin-halls-wrapper">
          <p className="admin-text">Доступные залы:</p>
          
          {loading && <p>Загрузка...</p>}
          {error && <p className="error-text">{error}</p>}
          
          {!loading && !error && (
            <>
              <ul className="admin-halls-list">
                {halls.map(hall => (
                  <li key={hall.id} className="admin-halls-list-item" id={`hall${hall.id}`}>
                    <p className="admin-halls-item-text">{hall.name}</p>
                    <button
                      className="admin-delete-button-halls admin-delete-button"
                      onClick={() => handleDeleteHall(hall.id)}
                    ></button>
                  </li>
                ))}
              </ul>
              <button
                className="admin-halls-button button"
                onClick={() => setIsPopupOpen(true)}
              >
                Создать зал
              </button>
            </>
          )}
        </div>
      </div>
      <AddHallPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAddHall={handleAddHall}
      />
    </section>
  );
};

export default HallsManagement;