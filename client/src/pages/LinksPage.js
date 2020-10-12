import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";

export const LinksPage = () => {
  const [links, setLinks] = useState();
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();

  // GET all links of current user
  const getAllUserLinks = useCallback(async () => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await request("/api/link", "GET", null, headers);
      setLinks(result);
    } catch (error) {
      console.log(error.message);
    }
  }, [token, request]);

  useEffect(() => {
    getAllUserLinks();
  }, [getAllUserLinks]);

  if (loading) {
    return <Loader />;
  }
  return <LinksList links={links} />;
};
