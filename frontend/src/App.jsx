import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    deadline: ""
  });

  const API_URL = "http://localhost:5000";

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/api/tasks`, formData);
      setFormData({
        title: "",
        subject: "",
        deadline: ""
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const markAsCompleted = async (id) => {
    try {
      await axios.patch(`${API_URL}/api/tasks/${id}/complete`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Student Study Planner</h1>
      <p className="subtitle">
        Organize your subjects, deadlines and study tasks.
      </p>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${task.completed ? "completed" : ""}`}
            >
              <div>
                <h3>{task.title}</h3>
                <p>Subject: {task.subject}</p>
                <p>
                  Deadline:{" "}
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : "No deadline"}
                </p>
                <p>Status: {task.completed ? "Completed" : "Pending"}</p>
              </div>

              {!task.completed && (
                <button onClick={() => markAsCompleted(task.id)}>
                  Mark completed
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;