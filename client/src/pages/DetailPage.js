import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";

export const DetailPage = () => {
  const { id } = useParams();
  const { request, loading } = useHttp();
  const [link, setLink] = useState({});

  // GET by ID only once
  const getLinkById = useCallback(async () => {
    try {
      const [result] = await request(`/api/link/${id}`, "GET", null);
      setLink(result);
    } catch (error) {
      //console.log(error.message);
    }
  }, [id, request]);

  useEffect(() => {
    getLinkById();
  }, [getLinkById]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>URL</h1>
      <p>
        Original: <a href={link.originalUrl}>{link.originalUrl}</a>
      </p>
      <p>
        Short: <a href={link.shortUrl}>{link.shortUrl}</a>
      </p>
      <p>Number of clicks: {link.clicks}</p>
      <p>Creation date: {new Date(parseInt(link.date)).toLocaleDateString()}</p>
    </div>
  );
};
