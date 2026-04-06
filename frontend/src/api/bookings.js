import axios from './axios';

export const createBooking = async (bookingData) => {
  const response = await axios.post('/bookings/', bookingData);
  return response.data;
};

export const getHallConfig = async (seanceId, date) => {
  // Если у вас есть эндпоинт для конфигурации зала с учётом даты
  const response = await axios.get(`/movies/halls/config/?seanceId=${seanceId}&date=${date}`);
  return response.data;
};