import axios from "axios";

const API_URL = "http://localhost:5005";

function TaskCard(props) {
    const { description, _id } = props.task;

    // ***** DELETE TASK *****
    const handleDelete = () => {
        axios.delete(`${API_URL}/api/tasks/${_id}`)
        .then(() => {
            props.updateTasks();
        })
        .catch((error) => console.log(error));
    };

    return (
      <div>
        {/* Added the span inside the p just for our view now, but might be nicer to have this in a separate line for styling */}
        <p>{description}
        <span onClick={handleDelete}>🗑️</span></p> 
      </div>
    );
}

export default TaskCard;
