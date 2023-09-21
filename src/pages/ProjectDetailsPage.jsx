import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import Ai from "../components/Ai";

const API_URL = "http://localhost:5005";

function ProjectDetailsPage() {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  const getProject = () => {
    axios
      .get(`${API_URL}/api/projects/${projectId}`)
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
    
      {/* ***** DISPLAY PROJECT DETAILS ***** */}
      {project && (
        <div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      )}

      {/* ***** DISPLAY TASKS ***** */}
      {project && project.tasks && (
        <div>
          {project.tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}

      {/* ***** DISPLAY AI RESPONSE ***** */}
      <Ai />

    </>
  );
}

export default ProjectDetailsPage;
