import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskCreate from "../components/TaskCreate";
import ProjectDelete from "../components/ProjectDelete";
import Ai from "../components/Ai";

const API_URL = "http://localhost:5005";

// ***** GET PROJECT DETAILS FROM API *****
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

  // ***** REDIRECT TO HOMEPAGE AFTER DELETING PROJECT *****
  const navigate = useNavigate();

  const completeDeleteSuccess = () => {
    navigate("/");
  };

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
            <TaskCard key={task._id} task={task} updateTasks={getProject} /> // refresh the project data after deleting task
          ))}
          <TaskCreate projectId={projectId} updateTasks={getProject} />{" "}
          {/* refresh the project after adding new task */}
        </div>
      )}

      {/* ***** DISPLAY AI RESPONSE ***** */}
      <Ai />

      {/* ***** DELETE THE PROJECT & ATTACHED TASKS BUTTON ***** */}
      <ProjectDelete
        projectId={projectId}
        completeDeleteSuccess={completeDeleteSuccess}
      />
    </>
  );
}

export default ProjectDetailsPage;
