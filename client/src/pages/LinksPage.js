import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";

export const LinksPage = () => {
  const [updatePage, setUpdatePage] = useState(false);
  const [links, setLinks] = useState();
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();

  const updateLinksPage = () => {
    setUpdatePage(true);
  };

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
    setUpdatePage(false);
  }, [getAllUserLinks, updatePage]);

  if (loading) {
    return <Loader />;
  }
  return <LinksList links={links} updateLinksPage={updateLinksPage} />;
};
