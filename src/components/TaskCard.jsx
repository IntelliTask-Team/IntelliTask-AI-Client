function TaskCard(props) {
    const { description } = props.task;
  
    return (
      <div>
        <p>{description}</p>
      </div>
    );
  }
  
  export default TaskCard;
  