import React, { useEffect } from 'react';

const BookingPage = () => {
  // Позже здесь будет получение данных о сеансе и конфигурации зала
  useEffect(() => {
    document.body.classList.add('body-bg');
    return () => document.body.classList.remove('body-bg');
  }, []);

  return (
    <div className="content-wrapper">
      <header className="header header-other-pages">
        <h1 className="header-logo">Идём<span className="header-logo-thin">в</span>кино</h1>
      </header>
      <main className="client-hall-wrapper">
        <div className="session-info-wrapper">
          <div className="session-info">
            {/* Здесь будет информация о фильме, зале, времени */}
          </div>
          <div className="zoomed-hand">
            <img src="./img/hint.png" alt="" className="hint-icon" />
            <p className="hint-text">Тапните дважды, чтобы увеличить</p>
          </div>
        </div>
        <section className="hall">
          <div className="hall-grid">
            {/* Схема зала будет отрисована позже */}
          </div>
          <div className="hall-legend">
            <div className="legend-wrapper">
              <div className="legend-item">
                <span className="hall-seat seat-free"></span>
                <span id="legend-standard" className="legend-label"></span>
              </div>
              <div className="legend-item">
                <span className="hall-seat seat-vip"></span>
                <span id="legend-vip" className="legend-label"></span>
              </div>
              <div className="legend-item">
                <span className="hall-seat seat-occupied"></span>
                <span className="legend-label">Занято</span>
              </div>
              <div className="legend-item">
                <span className="hall-seat hall-seat-chosen"></span>
                <span className="legend-label">Выбрано</span>
              </div>
            </div>
          </div>
        </section>
        <div className="booking">
          <button className="booking-button button">Забронировать</button>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;