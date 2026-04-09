import axios from './axios';

export const fetchHalls = async () => {
  const response = await axios.get('/movies/halls/');
  return response.data;
};

export const createHall = async (hallName) => {
  const response = await axios.post('/movies/halls/', { name: hallName });
  return response.data;
};

export const deleteHall = async (hallId) => {
  const response = await axios.delete(`/movies/halls/${hallId}/`);
  return response.data;
};