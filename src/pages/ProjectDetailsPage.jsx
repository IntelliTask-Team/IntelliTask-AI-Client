import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import TaskListDnD from "../components/TaskListDnD";
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

  // ***** DRAG AND DROP UPDATE FRONT & BACKEND *****
  const handleTasksUpdate = (newTasksList) => {
    setProject({ ...project, tasks: newTasksList }); // update frontend

    // Make API call to update tasks in the backend
    axios
      .put(`${API_URL}/api/tasks/reorder`, { reorderedTasks: newTasksList })
      .then((response) => console.log("Tasks reordered successfully"))
      .catch((error) => console.log(error));
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

      {/* ***** DISPLAY TASKS WITH DRAG AND DROP ***** */}
      {project && project.tasks && (
        <TaskListDnD tasks={project.tasks} updateTasks={handleTasksUpdate} />
      )}

      {/* ***** CREATE NEW TASK ***** */}
      {project && 
    <TaskCreate
        projectId={projectId}
        updateTasks={getProject}
        currentOrder={
            project.tasks && project.tasks.length > 0
            ? project.tasks[project.tasks.length - 1].order + 1
            : 0
        }
    />
}

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
