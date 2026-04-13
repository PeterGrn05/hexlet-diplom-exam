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

export const fetchHallConfig = async (hallId) => {
  const response = await axios.get(`/movies/halls/${hallId}/config/`);
  return response.data;
};

export const saveHallConfig = async (hallId, config) => {
  const response = await axios.post(`/movies/halls/${hallId}/config/`, { config });
  return response.data;
};

export const fetchHallPrices = async (hallId) => {
  const response = await axios.get(`/movies/halls/${hallId}/prices/`);
  return response.data;
};

export const saveHallPrices = async (hallId, priceStandard, priceVip) => {
  const response = await axios.post(`/movies/halls/${hallId}/prices/`, {
    price_standard: priceStandard,
    price_vip: priceVip,
  });
  return response.data;
};