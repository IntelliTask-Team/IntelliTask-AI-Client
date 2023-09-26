import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TaskListDnD from "../components/TaskListDnD";
import TaskCard from "../components/TaskCard";
import TaskCreate from "../components/TaskCreate";
import ProjectDelete from "../components/ProjectDelete";
import Ai from "../components/Ai";
import ProjectEdit from "../components/ProjectEdit";

// ***** GET PROJECT DETAILS FROM API *****
function ProjectDetailsPage() {
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { projectId } = useParams();

  const getProject = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`)
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
      .put(`${import.meta.env.VITE_API_URL}/api/tasks/reorder`, {
        reorderedTasks: newTasksList,
      })
      .then((response) => console.log("Tasks reordered successfully"))
      .catch((error) => console.log(error));
  };

    // ***** EDIT DESCRIPTION & TITLE INLINE *****
  const handleEditSave = (newTitle, newDescription) => {
    const updatedProject = {
      ...project,
      title: newTitle,
      description: newDescription,
    };
    setProject(updatedProject);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/projects/${project._id}`,
        updatedProject
      )
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* ***** DISPLAY PROJECT DETAILS ***** */}
      {project && (
        <div>
          {isEditing ? (
            <ProjectEdit project={project} onSave={handleEditSave} />
          ) : (
            <>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </div>
      )}

      {/* ***** DISPLAY TASKS WITH DRAG AND DROP ***** */}
      {project && project.tasks && (
        <TaskListDnD tasks={project.tasks} updateTasks={handleTasksUpdate} />
      )}

      {/* ***** CREATE NEW TASK ***** */}
      {project && (
        <TaskCreate
          projectId={projectId}
          updateTasks={getProject}
          currentOrder={
            project.tasks && project.tasks.length > 0
              ? project.tasks[project.tasks.length - 1].order + 1
              : 0
          }
        />
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
