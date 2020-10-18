import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const auth = useContext(AuthContext);

  // Hamburger button action (materialize)
  useEffect(() => {
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        var elems = document.querySelectorAll(".sidenav");
        window.M.Sidenav.init(elems, {});
      },
      []
    );
  });

  return (
    <div>
      <nav>
        <div className="nav-wrapper teal darken-1">
          <a href="/" className="brand-logo">
            <img
              alt="logo"
              className="logo"
              src={require("../images/short-url-logo.jpg")}
            />
          </a>
          <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/create">Create</NavLink>
            </li>
            <li>
              <NavLink to="/links">Links</NavLink>
            </li>
            <li>
              <a href="/" onClick={auth.logout}>
                SignOut
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav sidenav-close" id="mobile-demo">
        <li>
          <NavLink to="/create">Create</NavLink>
        </li>
        <li>
          <NavLink to="/links">Links</NavLink>
        </li>
        <li>
          <a href="/" onClick={auth.logout}>
            SignOut
          </a>
        </li>
      </ul>
    </div>
  );
};
