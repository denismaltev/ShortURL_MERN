import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const auth = useContext(AuthContext);
  return (
    <nav>
      <div className="nav-wrapper teal darken-1">
        <a href="#" className="brand-logo">
          URL Shortener
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
  );
};
