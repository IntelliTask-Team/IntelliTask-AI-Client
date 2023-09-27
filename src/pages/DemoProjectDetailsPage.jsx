import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskListDnD from "../components/TaskListDnD";
import TaskCreate from "../components/TaskCreate";
import ProjectEdit from "../components/ProjectEdit";
import DemoAiResponse from "../components/DemoAiResponse";


// ***** GET PROJECT DETAILS FROM API *****
function DemoProjectDetailsPage() {
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { projectId } = useParams();

  const getProject = (newTasks = null) => {
    if (newTasks) {
      const updatedTasks = [...project.tasks, ...newTasks];
      setProject({ ...project, tasks: updatedTasks });
    } else {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/demo/projects/${projectId}`)
        .then((response) => {
          const oneProject = response.data;
          setProject(oneProject);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  // ***** DRAG AND DROP UPDATE FRONTEND ONLY *****
  const handleTasksUpdate = (newTasksList) => {
    setProject({ ...project, tasks: newTasksList }); 
  };

  // ***** EDIT DESCRIPTION & TITLE INLINE *****
  const handleEditSave = (newTitle, newDescription) => {
    const updatedProject = {
      ...project,
      title: newTitle,
      description: newDescription,
    };
    setProject(updatedProject);
    setIsEditing(false); 
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
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-2">{project.title}</h1>
              <p className="font-light mb-3">{project.description}</p>
              <button className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-stone-300 text-stone-500 hover:text-stone-800 mt-4 lg:mt-0 mb-4" onClick={() => setIsEditing(true)}>Edit</button>
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

      {/* ***** DISPLAY FAKE AI RESPONSE ***** */}
      <DemoAiResponse />

      </div>
    </div>
    </>
  );
}

export default DemoProjectDetailsPage;