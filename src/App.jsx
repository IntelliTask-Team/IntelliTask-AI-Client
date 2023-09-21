import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

function App() {

  return (
    <div>
      {/* <Navbar /> */}

      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
