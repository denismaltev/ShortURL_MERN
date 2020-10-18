import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // Login OR Register depends on  action.
  const clickHandler = async (action) => {
    try {
      const body = JSON.stringify(form);
      const data = await request(`/api/auth/${action}`, "POST", body);
      message(data.message);
      //console.log(data);
      auth.login(data.token, data.userId);
    } catch (error) {
      //console.log("Error: ", error.message);
    }
  };

  return (
    <div>
      <div className="auth-form card blue-grey darken-1">
        <img
          alt="short-url-logo"
          className="logo"
          src={require("../images/short-url-header.jpg")}
        />
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
            disabled={loading}
          >
            Sign In
          </button>
          <button
            className="waves-effect waves-light btn"
            onClick={() => {
              clickHandler("register");
            }}
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
