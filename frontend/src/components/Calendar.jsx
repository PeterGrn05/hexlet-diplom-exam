import React, {useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/styles.css';

const Calendar = () => {
  const { selectedDate, setSelectedDate } = useAppContext();
  const [days, setDays] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const today = new Date();
    let start = new Date(today);
    if (offset === 1) start.setDate(today.getDate() + 6);
    const week = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      week.push(date);
    }
    setDays(week);
  }, [offset]);

  const handleDateClick = (date) => {
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    setSelectedDate(dateStr);
  };

  const getWeekDay = (date) => ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][date.getDay()];

  return (
    <nav className="nav">
      <ul className="nav-list">
        {days.map((day, idx) => {
          const isToday = day.toDateString() === new Date().toDateString();
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          const dateStr = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
          const isActive = dateStr === selectedDate;
          return (
            <li
              key={idx}
              className={`nav-item ${isWeekend ? 'nav-item-red' : ''} ${isActive ? 'nav-item-active' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <p className="date-day">{isToday ? 'Сегодня' : `${getWeekDay(day)},`}</p>
              <p className="date-number">{day.getDate()}</p>
            </li>
          );
        })}
        <li className="nav-item" onClick={() => setOffset(offset === 0 ? 1 : 0)}>
          <p className="date-link date-switch">{offset === 0 ? '>' : '<'}</p>
        </li>
      </ul>
    </nav>
  );
};

export default Calendar;