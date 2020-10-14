import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useHttp = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null) => {
      try {
        // for loader animation
        setLoading(true);

        // Set header with JWT-token for request
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "ERROR: Something went wrong!");
        }
        setLoading(false);
        return data;
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    },
    [token]
  );

  const clearError = () => {
    setError(null);
  };

  return { loading, request, error, clearError };
};
