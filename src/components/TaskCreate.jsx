// TaskCreate.jsx
import axios from "axios";
import { useState } from "react";

function TaskCreate({ projectId, updateTasks, currentOrder }) {
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/${projectId}/tasks`, {
        description: taskDescription,
        order: currentOrder,
      })
      .then(() => {
        setTaskDescription("");
        updateTasks();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TaskCreate;
