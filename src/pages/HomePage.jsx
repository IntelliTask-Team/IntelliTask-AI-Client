import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ProjectCard from "../components/ProjectCard";

function HomePage() {
  return (
    <div className="HomePage relative pb-20 px-5 md:px-10 w-full 2xl:w-1/2 max-w-4xl mb-10">
      <h1 className="mt-20 mb-5 text-3xl font-bold tracking-tight text-gray-900 text-center">
        AI Powered Projects
      </h1>
      <Link to={`/create-project`}>
        <p className="mb-20 text-xs font-bold tracking-tight text-gray-400 text-center">
          CREATE A PROJECT
        </p>
      </Link>
      <h2>PROJECTS WILL BE ADDED LATER</h2>
      
    </div>
  );
}

export default HomePage;
