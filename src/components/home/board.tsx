import React from "react";
import { Droppable } from "react-beautiful-dnd";
import List from "./list";
import { FaCirclePlus } from "react-icons/fa6";
import { useModal } from "../globalContext";
import NewTask from "./newtask";

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
  list: {
    id: string;
    title: string;
    tasks: Task[];
  };
}

const Board: React.FC<ListProps> = ({ list }) => {
  const { openModal, setTitle } = useModal();

  function modalCreate() {
    setTitle(list.title);
    console.log(list.title);
    openModal();
  }

  return (
    <div className="list">
      <h3>{list.title}</h3>
      <NewTask />

      <Droppable droppableId={list.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
          >
            {list.tasks.map((task, index) => (
              <List key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button onClick={modalCreate} className="create-card-button">
        create a card <FaCirclePlus className="add-icon" />
      </button>
    </div>
  );
};

export default Board;
