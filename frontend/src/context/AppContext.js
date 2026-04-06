import React, { createContext, useState, useEffect } from 'react';
import { fetchAllData } from '../api/movies';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [loading, setLoading] = useState(true);

  function getTodayString() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllData();
        setMovies(data.movies);
        setHalls(data.halls);
        setSessions(data.sessions);
      } catch (error) {
        console.error('Failed to load data', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{
      movies,
      halls,
      sessions,
      selectedDate,
      setSelectedDate,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};