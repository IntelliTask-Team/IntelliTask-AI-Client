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

  return (
    <button
      onClick={deleteProject}
      className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-rouge text-white hover:bg-red-700"
    >
      Delete Project
    </button>
  );
}

export default ProjectDelete;
