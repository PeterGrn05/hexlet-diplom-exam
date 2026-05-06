// frontend/src/hooks/useFetch.js
import { useState, useEffect, useRef } from 'react';

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    setIsLoading(true);
    setError(null);

    fetchFunction()
      .then(result => {
        if (isMounted.current) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted.current) {
          setError(err.message || 'Произошла ошибка');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted.current = false;
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFunction, ...dependencies]);

  return { data, isLoading, error };
};