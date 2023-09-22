import { useState, useEffect } from "react";
import axios from "axios";

import ProjectCard from "../components/ProjectCard";

const API_URL = "http://localhost:5005";

function HomePage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="HomePage max-w-7xl flex flex-col justify-center ">
      <h1 className="text-red-500">Projects made with IntelliTask AI</h1>

      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
}

export default HomePage;
