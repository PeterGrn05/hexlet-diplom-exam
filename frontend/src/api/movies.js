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

// Единый метод для получения всех данных
export const fetchAllData = async () => {
  try {
    const [movies, halls, sessions] = await Promise.all([
      fetchMovies(),
      fetchHalls(),
      fetchSessions(),
    ]);
    return { movies, halls, sessions };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Не удалось загрузить данные. Проверьте соединение с сервером.');
  }
};