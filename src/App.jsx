import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AddProject from "./pages/AddProject";
import EditProjectPage from "./pages/EditProjectPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-project" element={<AddProject />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/edit-project/:projectId" element={<EditProjectPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
