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
          Projects Enhanced by AI
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
              Get a task breakdown of your projects
            </h2>
            <p className="mb-4 font-light">
              Effortlessly obtain task breakdowns for your projects with our
              user-friendly platform. Harness the power of AI to simplify
              project planning and tracking. Create, organize, and monitor your
              tasks with ease, all at no cost. Welcome to project management
              made simple.
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
            <div className="mb-6 w-20 h-20 bg-jaune rounded-full flex justify-center items-center border-4 border-white">
              <p className="text-white font-semibold text-3xl">1</p>
            </div>
            <h3 className="text-md font-regular pb-2">
              Initiate projects on your dedicated page.
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center w-full text-center">
            <div className="mb-6 w-20 h-20 bg-jaune rounded-full flex justify-center items-center border-4 border-white">
              <p className="text-white font-semibold text-3xl">2</p>
            </div>
            <h3 className="text-md font-regular pb-2">
              Provide a description for the AI to grasp your goals.
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center w-full text-center">
            <div className="mb-6 w-20 h-20 bg-jaune rounded-full flex justify-center items-center border-4 border-white">
              <p className="text-white font-semibold text-3xl">3</p>
            </div>
            <h3 className="text-md font-regular pb-2">
              Let the AI suggest you a task breakdown in seconds.
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center w-full text-center">
            <div className="mb-6 w-20 h-20 bg-jaune rounded-full flex justify-center items-center border-4 border-white">
              <p className="text-white font-semibold text-3xl">4</p>
            </div>
            <h3 className="text-md font-regular pb-2">
              Write tasks and keep track of your progress.
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
