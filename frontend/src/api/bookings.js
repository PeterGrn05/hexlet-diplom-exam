import axios from './axios';

export const createBooking = async (bookingData) => {
  const response = await axios.post('/bookings/', bookingData);
  return response.data;
};

// Получить занятые места для сеанса
export const getTakenSeats = async (sessionId) => {
  const response = await axios.get(`/bookings/by-session/${sessionId}/`);
  return response.data;
};

// Получить конфигурацию зала (через halls)
export const getHallConfigById = async (hallId) => {
  const response = await axios.get(`/movies/halls/${hallId}/config/`);
  return response.data;
};