import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import UserList from "./components/UserList";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UploadAvatar from "./components/UploadAvatar";

import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth */}
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard/Profile */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={token ? <Profile token={token} /> : <Navigate to="/login" />}
          />

          {/* User List (Admin only) */}
          <Route
            path="/users"
            element={token ? <UserList token={token} /> : <Navigate to="/login" />}
          />

          {/* Forgot / Reset Password */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Upload Avatar */}
          <Route
            path="/upload-avatar"
            element={token ? <UploadAvatar token={token} /> : <Navigate to="/login" />}
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
