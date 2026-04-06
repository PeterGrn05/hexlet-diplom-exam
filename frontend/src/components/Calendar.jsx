import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/styles.css';

const Calendar = () => {
  const { selectedDate, setSelectedDate } = useContext(AppContext);
  const [days, setDays] = useState([]);
  const [offset, setOffset] = useState(0); // 0 - текущая неделя, 1 - следующая

  const getWeekDays = (startDate) => {
    const week = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const updateDays = () => {
    const today = new Date();
    let start = new Date(today);
    if (offset === 1) {
      start.setDate(today.getDate() + 6);
    }
    const weekDays = getWeekDays(start);
    setDays(weekDays);
  };

  useEffect(() => {
    updateDays();
  }, [offset]);

  const handleDateClick = (date) => {
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    setSelectedDate(dateStr);
  };

  const handleNextWeek = () => setOffset(1);
  const handlePrevWeek = () => setOffset(0);

  return (
    <nav className="nav">
      <ul className="nav-list">
        {days.map((day, idx) => {
          const isToday = day.toDateString() === new Date().toDateString();
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          const dateStr = `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`;
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
        <li className="nav-item" onClick={offset === 0 ? handleNextWeek : handlePrevWeek}>
          <p className="date-link date-switch">{offset === 0 ? '>' : '<'}</p>
        </li>
      </ul>
    </nav>
  );
};

function getWeekDay(date) {
  const names = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  return names[date.getDay()];
}

export default Calendar;