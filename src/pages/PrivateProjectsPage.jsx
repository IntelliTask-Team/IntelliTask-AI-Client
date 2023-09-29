import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";

function PrivateProjectsPage() {
  const storedToken = localStorage.getItem("authToken");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  const getAllProjects = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProjects(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const getUserDetails = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUsername(response.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProjects();
    getUserDetails();
  }, []);

  return (
    <div className="HomePage relative pb-20 px-5 md:px-10 w-full 2xl:w-1/2 max-w-4xl mb-20">
      <h1 className="mt-20 mb-5 text-3xl font-bold tracking-tight text-gray-900 text-center">
        {username ? `${username}'s Projects` : "My Projects"}
      </h1>
      <Link to={`/create-project`}>
        <p className="mb-20 text-xs font-bold tracking-tight text-gray-400 text-center">
          CREATE A NEW PROJECT
        </p>
      </Link>

      {isLoading ? (
        <div className="flex flex-col justify-center m-auto w-20">
          <img src="/images/waiting.gif" alt="Loading GIF" />
        </div>
      ) : (
        <>
          {projects.length ? (
            projects.map((project) => (
              <ProjectCard key={project._id} {...project} />
            ))
          ) : (
            <div className="text-center mt-10">
              <p className="mb-6">You don't have any projects yet. Start one now!</p>
              <Link to={`/create-project`}>
                <div className="inline-block text-sm px-4 py-3 leading-none font-medium border rounded bg-vert text-white border-transparent hover:bg-emerald-700 mt-4 lg:mt-0">
                  Get Started
                </div>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PrivateProjectsPage;
