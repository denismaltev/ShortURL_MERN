import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook";

export const AuthPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, request } = useHttp();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // Login OR Register depends on  action.
  const clickHandler = async (action) => {
    try {
      const body = JSON.stringify(form);
      const data = await request(`/api/auth/${action}`, "POST", body, headers);
      console.log(data);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <div className="auth-form card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Authorization</span>
          <div className="row">
            <div className="input-field">
              <input
                id="email"
                type="email"
                name="email"
                className="white-input"
                required
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input
                id="password"
                type="password"
                name="password"
                className="white-input"
                required
                onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
        </div>
        <div className="card-action">
          <button
            className="waves-effect waves-light btn"
            onClick={() => {
              clickHandler("login");
            }}
          >
            Sign In
          </button>
          <button
            className="waves-effect waves-light btn"
            onClick={() => {
              clickHandler("register");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
