import { useState } from "react";

function ProjectEdit({ project, onSave }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const handleSave = () => {
    onSave(title, description);
  };

  return (
    <div>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
  
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
  
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={() => onSave(project.title, project.description)}>Cancel</button> 
    </div>
  );
}

export default ProjectEdit;
