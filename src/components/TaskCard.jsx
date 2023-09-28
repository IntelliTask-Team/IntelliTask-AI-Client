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
          updateTasksFrontend();
        })
        .catch((err) => console.log(err));
    } else {
      updateTasksFrontend();
    }
  };

  const updateTasksFrontend = () => {
    const updatedTasks = tasks.filter((task) => task._id !== _id);
    updateTasks(updatedTasks);
  };

    // ***** CHECKBOX TASK *****
    const handleCheckboxChange = () => {
      if (isLoggedIn) {
        axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${_id}`, {
          completed: !task.completed
        }, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then(response => {
          const updatedTask = response.data;
          const updatedTasks = tasks.map(task => task._id === updatedTask._id ? updatedTask : task);
          updateTasks(updatedTasks);
        })
        .catch(err => console.log(err));
      } else {
        const demoUpdatedTask = { ...task, completed: !task.completed };
        const updatedTasks = tasks.map(task => task._id === demoUpdatedTask._id ? demoUpdatedTask : task);
        updateTasks(updatedTasks);
      }
    };

  return (
    <div
      className="group flex flex-row items-center mb-2 border-b pb-2"
      ref={innerRef}
      {...provided.draggableProps}
    >
      <div className="flex flex-row w-full items-center place-content-between">
        <div className="flex flex-row items-center w-full">
          <div className="w-5 mr-2 cursor-pointer">
            <span {...provided.dragHandleProps}>
              <img src="/images/drag.png" />
            </span>
          </div>
          <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={handleCheckboxChange} 
        className="mr-2"
      />
          <p className="w-full" style={{textDecoration: task.completed ? 'line-through' : 'none'}}>{description}</p>
        </div>
        <div className="group-hover:opacity-100 opacity-0 w-5 ml-4 cursor-pointer" >
          <span onClick={handleDelete}>
            <img src="/images/bin.png" />
          </span>
        </div>
        </div>
    </div>
  );
}

export default TaskCard;
