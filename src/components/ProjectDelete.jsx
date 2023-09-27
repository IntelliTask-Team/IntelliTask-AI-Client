import axios from "axios";

function ProjectDelete({ projectId, completeDeleteSuccess }) {
  const storedToken = localStorage.getItem("authToken");
  const deleteProject = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        if (completeDeleteSuccess) completeDeleteSuccess();
      })
      .catch((error) => console.log(error));
  };

  return <button onClick={deleteProject}>Delete Project</button>;
}

export default ProjectDelete;
