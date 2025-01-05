import "./history.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface TaskHistoryItem {
  id: number;
  title: string;
  action: string;
  column_id: string;
  position: number;
  created_at: string;
}

const TaskHistory: React.FC = () => {
  const [history, setHistory] = useState<TaskHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTaskHistory = async () => {
    try {
      const response = await toast.promise(
        axios.get("http://localhost:4000/history"),
        {
          loading: "Fetching task history...",
          success: "Task history loaded!",
          error: "Failed to fetch task history.",
        }
      );
      setHistory(response.data.history);
    } catch (error) {
      console.error("Error fetching task history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskHistory();
  }, []);

  return (
    <div className="task-history">
      <h2>Task History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : history.length > 0 ? (
        <ul>
          {history.map(() => (
          <ul>
          {history.map((item) => (
            <li key={item.id}>
              {item.action === "updated" ? (
                <p style={{ color: "blue" }}>
                  {new Date(item.created_at).toLocaleString()} -{" "}
                  <strong>Moved:</strong> Task "{item.title}" to Column:{" "}
                  {item.column_id} at Position: {item.position}
                </p>
              ) : item.action === "deleted" ? (
                <p style={{ color: "red" }}>
                  {new Date(item.created_at).toLocaleString()} -{" "}
                  <strong>Deleted:</strong> Task "{item.title}" from Column:{" "}
                  {item.column_id}
                </p>
              ) : item.action === "created" ? (
                <p style={{ color: "green" }}>
                  {new Date(item.created_at).toLocaleString()} -{" "}
                  <strong>Created:</strong> Task "{item.title}" in Column:{" "}
                  {item.column_id} at Position: {item.position}
                </p>
              ) : (
                <p>
                  {new Date(item.created_at).toLocaleString()} -{" "}
                  <strong>{item.action}</strong>: Task "{item.title}" - Column:{" "}
                  {item.column_id} - Position: {item.position}
                </p>
              )}
            </li>
          ))}
        </ul>
        
          ))}
        </ul>
      ) : (
        <p>No task history found.</p>
      )}
    </div>
  );
};

export default TaskHistory;
