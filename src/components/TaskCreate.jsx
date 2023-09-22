// TaskCreate.jsx
import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:5005";

function TaskCreate({ projectId, updateTasks }) {
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    axios
      .post(`${API_URL}/api/${projectId}/tasks`, { description: taskDescription })
      .then(() => {
        setTaskDescription('');
        updateTasks();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
}

export default TaskCreate;
