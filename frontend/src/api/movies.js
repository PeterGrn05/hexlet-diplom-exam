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

export const createMovie = async (formData) => {
  const response = await axios.post('/movies/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteMovie = async (movieId) => {
  const response = await axios.delete(`/movies/${movieId}/`);
  return response.data;
};

export const createSession = async (sessionData) => {
  const response = await axios.post('/movies/sessions/', sessionData);
  return response.data;
};

export const deleteSession = async (sessionId) => {
  const response = await axios.delete(`/movies/sessions/${sessionId}/`);
  return response.data;
};

export const getPosterUrl = (posterPath) => {
  if (!posterPath) return '/placeholder.png';
  if (posterPath.startsWith('http')) return posterPath;
  return `http://127.0.0.1:8000${posterPath}`;
};