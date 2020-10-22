import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./routes";
import "materialize-css";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";

function App() {
  const { token, logout, login, userId, isAuthReady } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  // if data form localStorage is not ready
  if (!isAuthReady) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ token, logout, login, userId, isAuthenticated }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
