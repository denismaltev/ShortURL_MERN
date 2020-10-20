import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useHttp = () => {
  const { token, logout } = useContext(AuthContext);
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

        // checking if user is authorized
        if (response.status === 401) {
          setLoading(false);
          logout();
          return 0;
        }

        // cheking if the answer isn't OK code=200, send to user error-message using catch block.
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
    [token, logout]
  );

  const clearError = () => {
    setError(null);
  };

  return { loading, request, error, clearError };
};
