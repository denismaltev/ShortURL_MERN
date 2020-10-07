import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      //console.log(body.json());
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();
      //console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "ERROR: Something went wrong!");
      }
      setLoading(false);
      return data;
    },
    []
  );
  return { loading, request };
};
