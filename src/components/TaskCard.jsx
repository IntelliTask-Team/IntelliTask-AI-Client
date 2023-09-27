import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function TaskCard({ task, tasks, updateTasks, provided, innerRef }) {
  const { isLoggedIn } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const { description, _id } = task;

  // ***** DELETE TASK *****
  const handleDelete = () => {
    if (isLoggedIn) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/tasks/${_id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          console.log("Task deleted from backend. Now updating frontend.");
          updateTasksFrontend();
        })
        .catch((error) => console.log(error));
    } else {
      updateTasksFrontend();
    }
  };

  const updateTasksFrontend = () => {
    const updatedTasks = tasks.filter((task) => task._id !== _id);
    updateTasks(updatedTasks);
  };

  return (
    <div
      className="flex flex-row items-center mb-2 border-b pb-2"
      ref={innerRef}
      {...provided.draggableProps}
    >
      <div className="flex flex-row items-center flex-grow">
        <span {...provided.dragHandleProps}>
          <img src="/images/drag.png" className="w-5 mr-2 cursor-pointer" />
        </span>
        <div>{description}</div>
      </div>
      <span onClick={handleDelete}>
        <img src="/images/bin.png" className="w-5 ml-2 cursor-pointer" />
      </span>
    </div>
  );
}

export default TaskCard;
