import axios from "axios";

const API_URL = "http://localhost:5005";

function ProjectDelete({ projectId, completeDeleteSuccess }) {
  const deleteProject = () => {
    axios.delete(`${API_URL}/api/projects/${projectId}`)
      .then(() => {
        if (completeDeleteSuccess) completeDeleteSuccess();
      })
      .catch((error) => console.log(error));
  };

  return <button onClick={deleteProject}>Delete Project</button>;
}

export default ProjectDelete;
