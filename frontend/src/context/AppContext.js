import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchAllData } from '../api/movies';
import { useFetch } from '../hooks/useFetch';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(getTodayString());

  // Оборачиваем fetchAllData в useCallback, чтобы функция не пересоздавалась при каждом рендере
  const stableFetch = useCallback(() => fetchAllData(), []);

  const { data, isLoading, error } = useFetch(stableFetch, []);

  const value = {
    movies: data?.movies || [],
    halls: data?.halls || [],
    sessions: data?.sessions || [],
    selectedDate,
    setSelectedDate,
    isLoading,
    error,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const useAppContext = () => useContext(AppContext);