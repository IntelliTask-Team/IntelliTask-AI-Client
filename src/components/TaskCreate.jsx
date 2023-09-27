import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function TaskCreate({ projectId, updateTasks, currentOrder }) {
  const { isLoggedIn } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/${projectId}/tasks`,
          {
            description: taskDescription,
            order: currentOrder,
          },
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then(() => {
          setTaskDescription("");
          updateTasks();
        })
        .catch((err) => console.log(err));
    } else {
      const demoTask = {
        _id: new Date().toISOString(),
        description: taskDescription,
        order: currentOrder,
      };
      
      updateTasks([demoTask]);
      setTaskDescription("");
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Describe a task"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-3/4 p-2.5 mr-5"
          />
          <button
            type="submit"
            className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-vert text-white hover:bg-emerald-700 mt-4 lg:mt-0"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskCreate;
