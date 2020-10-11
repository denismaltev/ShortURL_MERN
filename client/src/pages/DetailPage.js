import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";

export const DetailPage = () => {
  const { id } = useParams();
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);
  const [link, setLink] = useState({});

  // GET by ID only once
  const getLinkById = useCallback(async () => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token, // get token from context
      };

      const [result] = await request(`/api/link/${id}`, "GET", null, headers);
      setLink(result);
    } catch (error) {
      //console.log(error.message);
    }
  }, [id, auth, request]);

  useEffect(() => {
    getLinkById();
  }, [getLinkById]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>URL</h1>
      <p>Original: {link.originalUrl}</p>
      <p>Short: {link.shortUrl}</p>
      <p>Number of clicks: {link.clicks}</p>
      <p>Creation date: {link.date}</p>
    </div>
  );
};
