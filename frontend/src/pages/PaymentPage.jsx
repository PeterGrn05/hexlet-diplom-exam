import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../api/bookings';
import '../utils/QRCreator';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);

  const filmTitle = localStorage.getItem('filmTitle');
  const hallTitle = localStorage.getItem('hallTitle');
  const seanceTime = localStorage.getItem('seanceTime');
  const chosenDate = localStorage.getItem('chosenDate') || localStorage.getItem('pickedDate');
  const seanceId = localStorage.getItem('seanceId');
  const chosenSeatsRaw = localStorage.getItem('chosenSeats');
  const chosenSeats = chosenSeatsRaw ? JSON.parse(chosenSeatsRaw) : [];

  // Исправлено: seat.cost вместо seat.coast
  const totalPrice = chosenSeats.reduce((sum, seat) => sum + (seat.cost || 0), 0);
  const placesString = chosenSeats.map(seat => `Ряд ${seat.row} Место ${seat.place}`).join(', ');

  useEffect(() => {
    document.body.classList.add('body-bg');
    return () => document.body.classList.remove('body-bg');
  }, []);

  const handleGetTicket = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Обязательные поля для модели Booking
      const bookingData = {
        session: parseInt(seanceId),
        seats: chosenSeats,
        user_email: 'guest@example.com',    // временно
        user_phone: '+70000000000',         // временно
        qr_code: '',
      };
      const newBooking = await createBooking(bookingData);
      localStorage.setItem('bookingId', newBooking.id);

      const qrText = `Дата: ${chosenDate}, Время: ${seanceTime}, Фильм: ${filmTitle}, Зал: ${hallTitle}, Места: ${placesString}, Стоимость: ${totalPrice} руб. Билет действителен строго на свой сеанс.`;
      if (typeof window.QRCreator !== 'function') {
        throw new Error('QRCreator не загружен');
      }
      
      const qrcode = window.QRCreator(qrText, {
        mode: 4,
        eccl: 0,
        mask: -1,
        image: 'PNG',
        modsize: 4,
        margin: 2,
      });

      const qrContainer = document.querySelector('.ticket-qr');
      if (qrContainer) {
        qrContainer.innerHTML = '';
        if (qrcode.error) {
          qrContainer.textContent = 'Ошибка генерации QR-кода';
          console.error('QR error:', qrcode.error, qrcode.errorSubcode);
        } else {
          qrContainer.appendChild(qrcode.result);
        }
      }

      const ticketButton = document.querySelector('.ticket-button');
      const priceParagraph = document.querySelector('.ticket-info-text-value:last-of-type')?.closest('p');
      if (ticketButton) ticketButton.classList.add('visually-hidden');
      if (priceParagraph) priceParagraph.remove();

      setQrGenerated(true);
    } catch (err) {
      console.error('Ошибка бронирования:', err);
      alert('Не удалось забронировать билеты. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  if (!chosenSeats.length || !filmTitle) {
    navigate('/');
    return null;
  }

  return (
    <div className="content-wrapper">
      <header className="header header-other-pages" onClick={() => navigate('/')}>
        <h1 className="header-logo">Идём<span className="header-logo-thin">в</span>кино</h1>
      </header>
      <main className="payment">
        <div className="payment-header">
          <h2 className="payment-title">Вы выбрали билеты:</h2>
        </div>
        <div className="ticket-info">
          <div className="ticket-info-text">
            <p>На фильм: <span className="ticket-info-text-value">{filmTitle}</span></p>
            <p>Места: <span className="ticket-info-text-value">{placesString}</span></p>
            <p>В зале: <span className="ticket-info-text-value">{hallTitle || 'Зал'}</span></p>
            <p>Начало сеанса: <span className="ticket-info-text-value">{seanceTime}</span></p>
            <p>Стоимость: <span className="ticket-info-text-value">{totalPrice}</span> рублей</p>
          </div>
          <button
            className="ticket-button button"
            onClick={handleGetTicket}
            disabled={loading || qrGenerated}
          >
            {loading ? 'Обработка...' : 'Получить код бронирования'}
          </button>
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