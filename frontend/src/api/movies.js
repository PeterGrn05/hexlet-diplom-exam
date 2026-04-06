import axios from './axios';

export const fetchMovies = async () => {
  const response = await axios.get('/movies/');
  return response.data;
};

export const fetchHalls = async () => {
  const response = await axios.get('/movies/halls/');
  return response.data;
};

export const fetchSessions = async () => {
  const response = await axios.get('/movies/sessions/');
  return response.data;
};

// Получить все данные одним запросом (как old allData.getData)
export const fetchAllData = async () => {
  const [movies, halls, sessions] = await Promise.all([
    fetchMovies(),
    fetchHalls(),
    fetchSessions(),
  ]);
  return { movies, halls, sessions };
};