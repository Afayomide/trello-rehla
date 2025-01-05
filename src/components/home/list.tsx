import React from "react";
import axios from "axios";
import { Draggable } from "react-beautiful-dnd";
import { IoTrashBinSharp } from "react-icons/io5";
import { useModal } from "../globalContext";
import toast from "react-hot-toast";

interface Task {
  id: number;
  title: string;
  description: string;
  tag: string;
  column_id: string;
  position: number;
  tag_bg: string;
  tag_color: string;
}

interface ListProps {
  task: Task;
  index: number;
}

const List: React.FC<ListProps> = ({ task, index }) => {
  const { setCallAPI } = useModal();

  const handleDelete = async () => {
    const deletePromise = axios.delete(
      `${import.meta.env.VITE_API_URL}/tasks/${task.id}`
    );

    toast.promise(deletePromise, {
      loading: "Deleting task...",
      success: "Task deleted successfully!",
      error: "Failed to delete task.",
    });

    try {
      await deletePromise;
      setCallAPI(true);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-card"
        >
          <div className="task-tag-container">
            <p
              className="task-tag"
              style={{ backgroundColor: task.tag_bg, color: task.tag_color }}
            >
              {task.tag}
            </p>
          </div>

          <p className="task-title">{task.title}</p>
          <p>{task.description}</p>
          <div className="icons">
            <IoTrashBinSharp
              className="icon delete-icon"
              onClick={handleDelete}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
