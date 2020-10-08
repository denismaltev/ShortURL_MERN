import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./routes";
import "materialize-css";

function App() {
  const { token, logout, login, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ token, logout, login, userId, isAuthenticated }}
    >
      <Router>
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
