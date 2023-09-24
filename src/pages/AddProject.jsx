import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description };

    axios
      .post(`${API_URL}/api/projects`, requestBody)
      .then((response) => {
        setTitle("");
        setDescription("");

        const projectId = response.data._id;

        navigate(`/projects/${projectId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddProject">
      <h1>Add Project</h1>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AddProject;
