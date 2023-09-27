import { useState, useEffect } from "react";
import axios from "axios";

import ProjectCard from "../components/ProjectCard";

function PrivateProjectsPage() {
  const storedToken = localStorage.getItem("authToken");
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/demo/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="HomePage relative pb-20 px-5 md:px-10 w-full 2xl:w-1/2 max-w-4xl">
      <h1 className="mt-20 mb-5 text-3xl font-bold tracking-tight text-gray-900 text-center">
        AI Powered Projects
      </h1>

      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
}

export default PrivateProjectsPage;
