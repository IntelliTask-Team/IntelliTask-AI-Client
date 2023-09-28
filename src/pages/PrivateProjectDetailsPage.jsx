import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TaskListDnD from "../components/TaskListDnD";
import TaskCreate from "../components/TaskCreate";
import ProjectDelete from "../components/ProjectDelete";
import Ai from "../components/Ai";
import ProjectEdit from "../components/ProjectEdit";

// ***** GET PROJECT DETAILS FROM API *****
function PrivateProjectDetailsPage() {
  const storedToken = localStorage.getItem("authToken");
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { projectId } = useParams();

  const getProject = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
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
    navigate("/projects");
  };

  // ***** DRAG AND DROP UPDATE FRONT & BACKEND *****
  const handleTasksUpdate = (newTasksList) => {
    setProject({ ...project, tasks: newTasksList }); // update frontend

    // Make API call to update tasks in the backend
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/tasks/reorder`,
        {
          reorderedTasks: newTasksList,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((responseData) => {
        console.log(responseData.data);
      })
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
        updatedProject,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="w-full lg:w-1/2 bg-white rounded-lg shadow sm:max-w-md md:max-w-xl lg:max-w-2xl md:mt-28 mb-40">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {/* ***** DISPLAY PROJECT DETAILS ***** */}
          {project && (
            <div>
              {isEditing ? (
                <ProjectEdit project={project} onSave={handleEditSave} />
              ) : (
                <>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-2">
                    {project.title}
                  </h1>
                  <p className="font-light mb-3">{project.description}</p>
                  <button
                    className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-stone-300 text-stone-500 hover:text-stone-800 mt-4 lg:mt-0 mb-4"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          )}

          {/* ***** DISPLAY TASKS WITH DRAG AND DROP ***** */}

          <h2 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-xl">
            Your tasks for this project
          </h2>
          {project && project.tasks && project.tasks.length > 0 ? (
            <TaskListDnD
              tasks={project.tasks}
              updateTasks={handleTasksUpdate}
            />
          ) : (
            <p className="text-sm font-light text-gray-500 mt-0">
              You don't have any tasks yet, get inspired by clicking "Ask the
              AI" below.
            </p>
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
          {project && (
            <Ai
              projectDescription={project.description}
              projectTitle={project.title}
            />
          )}

          {/* ***** DELETE THE PROJECT & ATTACHED TASKS BUTTON ***** */}
          <ProjectDelete
            projectId={projectId}
            completeDeleteSuccess={completeDeleteSuccess}
          />
        </div>
      </div>
    </>
  );
}

export default PrivateProjectDetailsPage;
