import React from "react";

export const AuthPage = () => {
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
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
        </div>
        <div className="card-action">
          <button className="waves-effect waves-light btn">Sign In</button>
          <button className="waves-effect waves-light btn">Sign Up</button>
        </div>
      </div>
    </div>
  );
};
