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
  // Добавляем fetchFunction в зависимости, но чтобы избежать бесконечных вызовов,
  // оберните fetchFunction в useCallback в родителе (см. пояснение ниже)
  }, [fetchFunction, ...dependencies]);

  return { data, isLoading, error };
};