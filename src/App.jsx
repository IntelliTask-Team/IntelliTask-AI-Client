import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DemoProjectOne from "./pages/DemoProjectOne";
import PrivateProjectsPage from "./pages/PrivateProjectsPage";
import PrivateProjectDetailsPage from "./pages/PrivateProjectDetailsPage";
import AddProject from "./pages/AddProject";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";

function App() {
  return (
    <div className="bg-beige w-full flex flex-col items-center min-h-screen">
      <Navbar />

      <Routes>
      <Route path="/" element={<HomePage />} />
          {/* LOGGED IN ROUTES */}
        <Route path="/projects" element={ <IsPrivate><PrivateProjectsPage />  </IsPrivate>} />
        <Route path="/projects/:projectId" element={<IsPrivate> <PrivateProjectDetailsPage /> </IsPrivate>} />
        <Route path="/create-project" element={<IsPrivate> <AddProject /> </IsPrivate>} />

        {/* NOT LOGGED IN ROUTES */}
        <Route path="/demo/projects/:projectId" element={<IsAnon> <DemoProjectOne /> </IsAnon>} />
        <Route path="/signup" element={<IsAnon><SignupPage/></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;
