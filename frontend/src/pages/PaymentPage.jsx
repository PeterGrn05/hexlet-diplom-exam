import React, { useEffect } from 'react';

const PaymentPage = () => {
  useEffect(() => {
    document.body.classList.add('body-bg');
    return () => document.body.classList.remove('body-bg');
  }, []);

  return (
    <div className="content-wrapper">
      <header className="header header-other-pages">
        <h1 className="header-logo">Идём<span className="header-logo-thin">в</span>кино</h1>
      </header>
      <main className="payment">
        <div className="payment-header">
          <h2 className="payment-title">Вы выбрали билеты:</h2>
        </div>
        <div className="ticket-info">
          <button className="ticket-button button">Получить код бронирования</button>
          <div className="ticket-qr"></div>
          <p className="ticket-hint">
            После оплаты билет будет доступен в этом окне, а также придёт вам на почту.
            Покажите QR-код нашему контроллёру у входа в зал.
          </p>
          <p className="ticket-hint">Приятного просмотра!</p>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;