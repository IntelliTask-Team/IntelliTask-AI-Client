import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";

function TaskListDnD({ tasks, updateTasks }) {
  // ***** DRAG AND DROP *****
  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return; // check if item is dropped in valid area
    const tasksCopy = [...tasks]; // create copy of original task list
    const [reorderedTask] = tasksCopy.splice(droppedItem.source.index, 1); // remove the dragged item
    tasksCopy.splice(droppedItem.destination.index, 0, reorderedTask); // insert dragged item in new place

    updateTasks(tasksCopy); // Update the tasks list directly in the parent component's state
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId="tasks-container" className="mt-0">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <TaskCard
                    task={task}
                    tasks={tasks}
                    updateTasks={updateTasks}
                    provided={provided}
                    innerRef={provided.innerRef}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskListDnD;
