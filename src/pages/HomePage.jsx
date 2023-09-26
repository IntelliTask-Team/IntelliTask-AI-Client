import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";

function HomePage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="HomePage relative pb-20 px-5 md:px-10 w-full 2xl:w-1/2 max-w-4xl mb-10">
      <h1 className="mt-20 mb-5 text-3xl font-bold tracking-tight text-gray-900 text-center">
        AI Powered Projects
      </h1>
      <Link to={`/`}>
        <p className="mb-20 text-xs font-bold tracking-tight text-gray-400 text-center">
          HOW DOES IT WORKS?
        </p>
      </Link>

      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
}

export default HomePage;
