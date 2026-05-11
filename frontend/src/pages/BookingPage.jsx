import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { getHallConfigById, getTakenSeats } from '../api/bookings';
import hintIcon from '../assets/icons/hint.png'

const BookingPage = () => {
  const navigate = useNavigate();
  const seanceId = localStorage.getItem('seanceId');
  const hallId = localStorage.getItem('seanceHallId');
  const seanceTime = localStorage.getItem('seanceTime');
  const filmTitle = localStorage.getItem('filmTitle');
  const selectedDate = localStorage.getItem('pickedDate');
  const [hallConfig, setHallConfig] = useState([]);
  const [takenSeats, setTakenSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hallPrices, setHallPrices] = useState({ standard: 0, vip: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      document.body.classList.add('body-bg');
      return () => document.body.classList.remove('body-bg');
    }, []);

  useEffect(() => {
    if (!hallId || !seanceId) {
      navigate('/');
      return;
    }
    const loadData = async () => {
      try {
        const [hallData, taken] = await Promise.all([
          getHallConfigById(hallId),
          getTakenSeats(seanceId),
        ]);
        setHallConfig(hallData.config || []);
        setTakenSeats(taken);
        const pricesResp = await axios.get(`/movies/halls/${hallId}/prices/`);
        setHallPrices({
          standard: pricesResp.data.price_standard,
          vip: pricesResp.data.price_vip,
        });
      } catch (err) {
        console.error(err);
        alert('Ошибка загрузки схемы зала');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [hallId, seanceId, navigate]);

  const toggleSeat = (rowIdx, colIdx, type) => {
    if (type === 'disabled' || type === 'taken') return;
    const alreadySelected = selectedSeats.some(s => s.row === rowIdx+1 && s.place === colIdx+1);
    if (alreadySelected) {
      setSelectedSeats(prev => prev.filter(s => !(s.row === rowIdx+1 && s.place === colIdx+1)));
    } else {
      const cost = type === 'vip' ? hallPrices.vip : hallPrices.standard;
      setSelectedSeats(prev => [...prev, { row: rowIdx+1, place: colIdx+1, cost }]);
    }
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Выберите места');
      return;
    }
    // Сохраняем выбранные места и дату, переходим к оплате
    localStorage.setItem('chosenSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('chosenDate', selectedDate);
    navigate('/payment');
  };

  const getSeatType = (rowIdx, colIdx) => {
    if (hallConfig[rowIdx]?.[colIdx] === 'disabled') return 'disabled';
    if (takenSeats.some(s => s.row === rowIdx+1 && s.place === colIdx+1)) return 'taken';
    if (hallConfig[rowIdx]?.[colIdx] === 'vip') return 'vip';
    return 'standard';
  };

  if (loading) return <div className="content-wrapper">Загрузка...</div>;

  return (
    <div className="content-wrapper">
      <header className="header header-other-pages" onClick={() => navigate('/')}>
        <h1 className="header-logo">Идём<span className="header-logo-thin">в</span>кино</h1>
      </header>
      <main className="client-hall-wrapper">
        <div className="session-info-wrapper">
          <div className="session-info">
            <p className="session-title">{filmTitle}</p>
            <p className="session-time">Начало сеанса: {seanceTime}</p>
            <p className="session-hall">{localStorage.getItem('hallTitle') || 'Зал'}</p>
          </div>
          <div className="zoomed-hand">
            <img src={hintIcon} alt="" className="hint-icon" />
            <p className="hint-text">Тапните дважды, чтобы увеличить</p>
          </div>
        </div>
        <section className="hall">
          <div className="hall-grid" style={{
            display: 'grid',
            gridTemplateRows: `repeat(${hallConfig.length}, 20px)`,
            gridTemplateColumns: `repeat(${hallConfig[0]?.length || 0}, 20px)`,
            gap: '4px',
            justifyContent: 'center'
          }}>
            {hallConfig.map((row, rowIdx) =>
              row.map((_, colIdx) => {
                const type = getSeatType(rowIdx, colIdx);
                const isSelected = selectedSeats.some(s => s.row === rowIdx+1 && s.place === colIdx+1);
                let seatClass = 'hall-seat';
                if (type === 'standard') seatClass += ' seat-free';
                if (type === 'vip') seatClass += ' seat-vip';
                if (type === 'disabled' || type === 'taken') seatClass += ' seat-occupied';
                if (isSelected) seatClass += ' hall-seat-chosen';
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={seatClass}
                    onClick={() => toggleSeat(rowIdx, colIdx, type)}
                  />
                );
              })
            )}
          </div>
          <div className="hall-legend">
            <div className="legend-wrapper">
              <div className="legend-item">
                <span className="hall-seat seat-free"></span>
                <span className="legend-label">Свободно ({hallPrices.standard} руб)</span>
              </div>
              <div className="legend-item">
                <span className="hall-seat seat-vip"></span>
                <span className="legend-label">Свободно VIP ({hallPrices.vip} руб)</span>
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
          <button className="booking-button button" onClick={handleBooking}>
            Забронировать
          </button>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;