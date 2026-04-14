import React, { useState, useEffect } from 'react';
import { fetchHalls, fetchHallSalesStatus, toggleHallSales } from '../../api/halls';

const OpenSales = () => {
  const [halls, setHalls] = useState([]);
  const [activeHallId, setActiveHallId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggling, setToggling] = useState(false);

  // Загрузка списка залов
  useEffect(() => {
    fetchHalls()
      .then(setHalls)
      .catch(console.error);
  }, []);

  // При смене зала загружаем его статус
  useEffect(() => {
    if (!activeHallId) return;
    setLoading(true);
    fetchHallSalesStatus(activeHallId)
      .then(data => setIsOpen(data.is_open))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeHallId]);

  const handleToggle = async () => {
    if (!activeHallId) return;
    setToggling(true);
    try {
      const newStatus = !isOpen;
      await toggleHallSales(activeHallId, newStatus);
      setIsOpen(newStatus);
    } catch (err) {
      alert('Ошибка изменения статуса продаж');
    } finally {
      setToggling(false);
    }
  };

  const getButtonText = () => {
    if (isOpen) return 'Приостановить продажу билетов';
    return 'Открыть продажу билетов';
  };

  return (
    <section>
      <header className="section-header">
        <h2 className="section-title">Открыть продажи</h2>
        <button className="section-header-button"></button>
      </header>
      <div className="manage-content">
        <div className="select-sales">
          <p className="admin-text">Выберите зал для открытия/закрытия продаж:</p>
          <div className="switch-hall-buttons switch-hall-buttons-launch">
            {halls.map(hall => (
              <button
                key={hall.id}
                className={`switch-hall-button ${activeHallId === hall.id ? 'switch-hall-button-active' : ''}`}
                onClick={() => setActiveHallId(hall.id)}
              >
                {hall.name}
              </button>
            ))}
          </div>
        </div>
        {activeHallId && (
          <>
            {loading ? (
              <p className="sales-text">Загрузка...</p>
            ) : (
              <p className="sales-text">
                {isOpen ? 'Продажи открыты' : 'Продажи закрыты'}
              </p>
            )}
            <div className="admin-buttons">
              <button
                className="button admin-button"
                onClick={handleToggle}
                disabled={toggling || loading}
              >
                {toggling ? 'Сохранение...' : getButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default OpenSales;