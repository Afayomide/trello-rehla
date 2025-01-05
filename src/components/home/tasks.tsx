import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Board from "./board";
import { useModal } from "../globalContext";

interface Task {
  id: number;
  title: string;
  description: string;
  tag: string;
  column_id: string;
  position: number;
  tag_color:string;
  tag_bg: string;
}

interface List {
  id: string;
  title: string;
  tasks: Task[];
}

interface BoardData {
  lists: Record<string, List>;
  listOrder: string[];
}

const Tasks = () => {
  const [data, setData] = useState<BoardData>({ lists: {}, listOrder: [] });
  const { callAPI, setCallAPI } = useModal();
  useEffect(() => {
    try {
      axios.get<Task[]>(`${import.meta.env.VITE_API_URL}/tasks`).then((response) => {
        const tasks = response.data;
           console.log(tasks)
        const lists: Record<string, List> = {
          backlog: { id: "backlog", title: "Backlog", tasks: [] },
          todo: { id: "todo", title: "To Do", tasks: [] },
          done: { id: "done", title: "Done", tasks: [] },
        };

        tasks.forEach((task) => {
          lists[task.column_id].tasks.push(task);
        });

        Object.keys(lists).forEach((key) => {
          lists[key].tasks.sort((a, b) => a.position - b.position);
        });

        setData({ lists, listOrder: ["backlog", "todo", "done"] });
      });
    } catch(error) {
      console.error(error)
    } finally {
      setCallAPI(false);
    }
  }, [callAPI]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    console.log(destination)

    const startList = data.lists[source.droppableId];
    const endList = data.lists[destination.droppableId];

    const draggedTask = startList.tasks[source.index];
    startList.tasks.splice(source.index, 1);
    endList.tasks.splice(destination.index, 0, draggedTask);

    setData({ ...data });

    axios.put(`${import.meta.env.VITE_API_URL}/tasks/${draggableId}`, {
      column_id: destination.droppableId,
      position: destination.index,
      
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        {data.listOrder.map((listId) => {
          const list = data.lists[listId];
          return <Board key={list.id} list={list} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default Tasks;
