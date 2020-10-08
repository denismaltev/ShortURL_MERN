import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        setLoading(true);
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        setLoading(false);
        if (!response.ok) {
          throw new Error(data.message || "ERROR: Something went wrong!");
        }
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { loading, request, error, clearError };
};
