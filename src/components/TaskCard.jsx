import axios from "axios";

function TaskCard({ task, tasks, updateTasks, provided, innerRef }) {
  const { description, _id } = task;

  // ***** DELETE TASK *****
  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/tasks/${_id}`)
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
      <div className="flex flex-row mb-2">
        <span {...provided.dragHandleProps}>
          <img src="/images/drag.png" className="w-5 mr-2 cursor-pointer" />
        </span>
        <div>{description}</div>
        <span onClick={handleDelete}>
          <img src="/images/bin.png" className="w-5 ml-2 cursor-pointer" />
        </span>
      </div>
    </div>
  );
}

export default TaskCard;
