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
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="bg-beige w-full flex flex-col items-center min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-project" element={<AddProject />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/edit-project/:projectId" element={<EditProjectPage />} />
        <Route path="/signup" element={<IsAnon><SignupPage/></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
      </Routes>
    </div>
  );
}

export default App;
