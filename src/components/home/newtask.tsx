import { useState, useEffect } from "react";
import { useModal } from "../globalContext";
import { IoCloseCircle } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { SketchPicker } from "react-color";

interface TaskInput {
  title: string;
  description: string;
  tag: string;
  column_id: string;
  position: number;
  tag_bg: string;
  tag_color: string;
}
interface ColorResult {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a?: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
    a?: number;
  };
}

const NewTask: React.FC = () => {
  const { isModalOpen, closeModal, title, setCallAPI } = useModal();
  const [color, setColor] = useState("###");
  const [bgColor, setBgColor] = useState("#fff");

  console.log(title);

  const [task, setTask] = useState<TaskInput>({
    title: "",
    description: "",
    tag: "",
    column_id: title.toLowerCase().replace(/\s+/g, ""),
    position: 0,
    tag_bg: bgColor,
    tag_color: color,
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setTask((prevState) => ({
      ...prevState,

      [name]: value,
    }));
  };
  useEffect(() => {
    setTask((prevState) => ({
      ...prevState,
      column_id: title.toLowerCase().replace(/\s+/g, ""),
    }));
  }, [title]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const taskPromise = axios.post(
      `${import.meta.env.VITE_API_URL}/tasks`,
      task
    );

    toast.promise(taskPromise, {
      loading: "Adding task...",
      success: "Task added successfully!",
      error: "Failed to add task.",
    });

    try {
      const response = await taskPromise;
      console.log(response);
      if (response.status === 201) {
        setCallAPI(true);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      closeModal();
    }
  };
  const handleColorChange = (newColor: ColorResult) => {
    setColor(newColor.hex);
    setTask((prevState) => ({
      ...prevState,
      tag_color: newColor.hex,
    }));
  };
  const handleBgColorChange = (newColor: ColorResult) => {
    setBgColor(newColor.hex);
    setTask((prevState) => ({
      ...prevState,
      tag_bg: newColor.hex,
    }));
  };

  return (
    <div className={`task-form-container ${isModalOpen ? "display" : ""}`}>
      <form className="task-form">
        <IoCloseCircle className="close-icon" onClick={closeModal} />
        <h3 className="task-form-title">
          Make a new <span className="card-title"> {title} </span> card
        </h3>
        <div className="task-input">
          <label htmlFor="tag">Tag</label>
          <br />
          <select
            id="tag"
            name="tag"
            onChange={handleChange}
            style={{ backgroundColor: bgColor, color: color }}
          >
            <option value="">Select a tag</option>
            <option value="shopping">Shopping</option>
            <option value="exam">Exam</option>
            <option value="meeting">Meeting</option>
            <option value="project">Project</option>
          </select>
          <div className="color-pickers">
            <div className="custom-picker">
              <p> tag background color </p>
              <SketchPicker
                className="color-picker"
                color={bgColor}
                onChange={handleBgColorChange}
              />
            </div>
            <div className="custom-picker">
              <p>tag font color</p>
              <SketchPicker
                className="color-picker"
                color={color}
                onChange={handleColorChange}
              />
            </div>
          </div>
        </div>
        <div className="task-input">
          <label htmlFor="title">Title</label>
          <br />
          <input
            className="title"
            placeholder="Enter what the task is about, e.g shopping for xmas"
            id="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="task-input">
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            className="task-description"
            placeholder="Go all in and describe what you want to shop for e.g your shopping list, etc."
            id="description"
            onChange={handleChange}
            name="description"
            rows={4} 
          />
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default NewTask;
