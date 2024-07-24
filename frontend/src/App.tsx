import { useState, useEffect } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8000/tasks");
    const tasks = await response.json();
    setTasks(tasks);
  };

  /* Complete the following functions to hit endpoints on your server */
  const createTask = async () => {
    if (!formData.title && !formData.description) return;
    const response = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        done: false,
      }),
    });
    const task = await response.json();
    setTasks([task, ...tasks]);
  };

  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = async (id: string, value: boolean) => {
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...tasks.find((task) => task.id === id),
        done: value,
      }),
    });
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: value } : task))
    );
  };

  return (
    <div className="container">
      <h1 className="container-title">Task Management</h1>
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          createTask();
        }}
      >
        <div className="form-inputs">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            required
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <button className="form-button">Create</button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task${task.done ? " done" : ""}`}>
            <input
              className="task-checkbox"
              type="checkbox"
              checked={task.done}
              onChange={(e) => updateTask(task.id, e.target.checked)}
            />
            <div className="task-text">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
            </div>
            <button
              className="task-delete-button"
              onClick={() => deleteTask(task.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
