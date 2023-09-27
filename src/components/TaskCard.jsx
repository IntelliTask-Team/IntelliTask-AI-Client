import axios from "axios";

function TaskCard({ task, tasks, updateTasks, provided, innerRef }) {
  const storedToken = localStorage.getItem("authToken");
  const { description, _id } = task;

  // ***** DELETE TASK *****
  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/tasks/${_id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        console.log("Task deleted from backend. Now updating frontend.");
        // Filter out the deleted task from the current task list
        const updatedTasks = tasks.filter((task) => task._id !== _id);
        console.log("Updated tasks after deletion:", updatedTasks);
        updateTasks(updatedTasks); // Update parent's task state with this new list
      })
      .catch((error) => console.log(error));
  };

  return (
    <div ref={innerRef} {...provided.draggableProps}>
      <p>
        <span {...provided.dragHandleProps}>✴️</span>
        {description}
        <span onClick={handleDelete}>🗑️</span>
      </p>
    </div>
  );
}

export default TaskCard;
