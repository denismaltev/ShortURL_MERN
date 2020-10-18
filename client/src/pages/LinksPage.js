import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";

export const LinksPage = () => {
  const [updatePage, setUpdatePage] = useState(false);
  const [allUserLinks, setAllUserLinks] = useState();
  const [filteredLinks, setFilteredLinks] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { request, loading } = useHttp();

  const updateLinksPage = () => {
    setUpdatePage(true);
  };

  // GET all links of current user
  const getAllUserLinks = useCallback(async () => {
    try {
      const result = await request("/api/link", "GET", null);
      setAllUserLinks(result);
      setFilteredLinks(result);
    } catch (error) {
      console.log(error.message);
    }
  }, [request]);

  const linksFilter = (event) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
    const filteredResult = allUserLinks.filter((link) =>
      link.originalUrl.includes(searchQuery)
    );
    setFilteredLinks(filteredResult);
  };

  // Clear search form
  const clearForm = () => {
    setSearchQuery("");
    setFilteredLinks(allUserLinks);
  };

  useEffect(() => {
    getAllUserLinks();
    setUpdatePage(false);
  }, [getAllUserLinks, updatePage]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="nav-wrapper">
        <form className="list-page-search-form">
          <div className="input-field search">
            <input
              id="search"
              type="search"
              required
              value={searchQuery}
              onChange={linksFilter}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons search">search</i>
            </label>
            <i className="material-icons search" onClick={clearForm}>
              close
            </i>
          </div>
        </form>
      </div>
      <LinksList links={filteredLinks} updateLinksPage={updateLinksPage} />
    </>
  );
};
