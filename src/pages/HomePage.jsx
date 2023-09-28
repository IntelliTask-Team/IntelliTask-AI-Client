import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";

function HomePage() {
  const storedToken = localStorage.getItem("authToken");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllProjects = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/demo/projects`, {
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

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="HomePage relative pb-20 px-5 md:px-10 w-full 2xl:w-3/4 max-w-6xl mb-20">
      <div className="flex flex-col items-center">
        <h1 className="mt-20 mb-5 text-3xl font-bold tracking-tight text-gray-900 text-center">
          AI Powered Projects
        </h1>
        <Link to={`/signup`}>
          <p className="mb-20 text-xs font-bold tracking-tight text-gray-400 text-center">
            CREATE YOUR OWN PROJECTS
          </p>
        </Link>

        <section className="flex flex-col md:flex-row w-full mb-32">
          <div className="flex items-center justify-center w-full md:w-1/2 md:pr-10">
            <img
              src="./images/illus.png"
              alt="Illustration of a task manager"
              className="w-4/5 sm:w-2/5 md:w-2/3 mb-10 md:mb-0"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center ">
            <h2 className="text-xl font-medium pb-2">
              Lorem ipsum sit dolor amet
            </h2>
            <p className="mb-4 font-light">
              Lorem ipsum sit dolor amet. Lorem ipsum sit dolor amet. Lorem
              ipsum sit dolor amet. Lorem ipsum sit dolor amet. Lorem ipsum sit
              dolor amet. Lorem ipsum sit dolor amet. Lorem ipsum sit dolor
              amet. Lorem ipsum sit dolor amet. Lorem ipsum sit dolor amet.
              Lorem ipsum sit dolor amet. Lorem ipsum sit dolor amet. Lorem
              ipsum sit dolor amet.
            </p>
            <Link to={`/signup`}>
              <div className="inline-block text-sm px-4 py-3 leading-none font-medium border rounded bg-vert text-white border-transparent hover:bg-emerald-700 mt-4 lg:mt-0">
                Create an account
              </div>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-20">
          <div className="flex flex-col justify-center items-center w-full text-center">
            <img
              src="./images/illus.png"
              alt="Illustration of a task manager"
              className="pb-6 w-32"
            />
            <h3 className="text-md font-medium pb-2">
              Lorem ipsum sit dolor amet sin.
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center w-full text-center">
            <img
              src="./images/illus.png"
              alt="Illustration of a task manager"
              className="pb-6 w-32"
            />
            <h3 className="text-md font-medium pb-2">
              Lorem ipsum sit dolor amet sin.
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center w-full text-center">
            <img
              src="./images/illus.png"
              alt="Illustration of a task manager"
              className="pb-6 w-32"
            />
            <h3 className="text-md font-medium pb-2">
              Lorem ipsum sit dolor amet sin.
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center w-full text-center">
            <img
              src="./images/illus.png"
              alt="Illustration of a task manager"
              className="pb-6 w-32"
            />
            <h3 className="text-md font-medium pb-2">
              Lorem ipsum sit dolor amet sin.
            </h3>
          </div>
        </section>

        <a href="/#demo">
          <div className="inline-block text-sm px-4 py-3 leading-none font-medium border rounded bg-vert text-white border-transparent hover:bg-emerald-700 mt-4 lg:mt-0 mb-20">
            See the demo projects
          </div>
        </a>

        {isLoading ? (
          <div className="flex flex-col justify-center m-auto w-20">
            <img src="/images/waiting.gif" alt="Loading GIF" />
          </div>
        ) : (
          <div id="demo" className="pb-20 px-5 md:px-10 w-full max-w-4xl mb-20">
            {projects.map((project) => (
              <ProjectCard key={project._id} {...project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
