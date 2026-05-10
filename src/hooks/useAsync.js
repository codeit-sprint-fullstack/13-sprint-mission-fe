import { useState, useEffect } from 'react';

export function useAsync(asyncFunction, deps = []) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const execute = async (...args) => {
    setPending(true);
    setError(null);
    try {
      const result = await asyncFunction(...args);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setPending(false);
    }
  };
  useEffect(() => {
   execute();
  }, deps);

  return { data, pending, error, execute };
};

