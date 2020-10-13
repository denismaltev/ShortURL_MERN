import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useHttp = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null) => {
      // Set header with JWT-token for request
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

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
    [token]
  );

  const clearError = () => {
    setError(null);
  };

  return { loading, request, error, clearError };
};
