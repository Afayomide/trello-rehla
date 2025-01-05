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
        axios.get(`${import.meta.env.VITE_API_URL}/history`),
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const groupByDate = (items: TaskHistoryItem[]) => {
    return items.reduce((acc: Record<string, TaskHistoryItem[]>, item) => {
      const date = formatDate(item.created_at);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupedHistory = groupByDate(history);

  return (
    <div className="task-history">
      <h2>Task History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : history.length > 0 ? (
        <div>
          {Object.entries(groupedHistory).map(([date, items]) => (
            <div key={date}>
              <h3>{date}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    {item.action === "updated" ? (
                      <p style={{ color: "blue" }}>
                        {new Date(item.created_at).toLocaleTimeString()} -{" "}
                        <strong>Moved:</strong> Task "{item.title}" to Column: {" "}
                        {item.column_id} at Position: {item.position}
                      </p>
                    ) : item.action === "deleted" ? (
                      <p style={{ color: "red" }}>
                        {new Date(item.created_at).toLocaleTimeString()} -{" "}
                        <strong>Deleted:</strong> Task "{item.title}" from Column: {" "}
                        {item.column_id}
                      </p>
                    ) : item.action === "created" ? (
                      <p style={{ color: "green" }}>
                        {new Date(item.created_at).toLocaleTimeString()} -{" "}
                        <strong>Created:</strong> Task "{item.title}" in Column: {" "}
                        {item.column_id} at Position: {item.position}
                      </p>
                    ) : (
                      <p>
                        {new Date(item.created_at).toLocaleTimeString()} -{" "}
                        <strong>{item.action}</strong>: Task "{item.title}" - Column: {" "}
                        {item.column_id} - Position: {item.position}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No task history found.</p>
      )}
    </div>
  );
};

export default TaskHistory;


