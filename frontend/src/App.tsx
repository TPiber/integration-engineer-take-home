import { useState, useEffect } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

function App() {
  const [editing, setEditing] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState<{
    message: string;
    show: boolean;
  }>({
    message: "",
    show: false,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/tasks");

      if (!response.ok) {
        const { error } = await response.json();

        throw new Error(error);
      }

      const tasks = await response.json();
      setTasks(tasks);
    } catch (error) {
      setError({
        message: `Error fetching tasks: ${(error as Error).message}`,
        show: true,
      });
    }
  };

  /* Complete the following functions to hit endpoints on your server */
  const createTask = async () => {
    if (!formData.title && !formData.description) return;
    try {
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

      if (!response.ok) {
        const { error } = await response.json();

        throw new Error(error);
      }

      const task = await response.json();
      setFormData({ title: "", description: "" });
      setTasks([task, ...tasks]);
    } catch (error) {
      setError({
        message: `Error creating task: ${(error as Error).message}`,
        show: true,
      });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const { error } = await response.json();

        throw new Error(error);
      }

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      setError({
        message: `Error deleting task: ${(error as Error).message}`,
        show: true,
      });
    }
  };

  const checkTask = async (id: string, value: boolean) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...tasks.find((task) => task.id === id),
          done: value,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();

        throw new Error(error);
      }

      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, done: value } : task))
      );
    } catch (error) {
      setError({
        message: `Error completing task: ${(error as Error).message}`,
        show: true,
      });
    }
  };

  const editTask = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...tasks.find((task) => task.id === id),
          ...formData,
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();

        throw new Error(error);
      }

      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, ...formData } : task))
      );
      setFormData({ title: "", description: "" });
      setEditing(null);
    } catch (error) {
      setError({
        message: `Error editing task: ${(error as Error).message}`,
        show: true,
      });
    }
  };

  const handleEditing = (id: string) => {
    setEditing(id);
    const task = tasks.find((task) => task.id === id);

    if (!task) return;

    setFormData({ ...task });
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "" });
    setEditing(null);
  };

  return (
    <>
      {error.show && (
        <div className="error-dialog">
          <div className="error-dialog-top">
            <span>Error</span>
            <button
              onClick={() => setError({ message: "", show: false })}
              className="error-dialog-close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>
          <div className="error-dialog-content">
            <p className="error-dialog-message">{error.message}</p>
          </div>
        </div>
      )}
      <div className="container">
        <h1 className="container-title">Task Management</h1>
        <form
          className="task-form"
          onSubmit={(e) => {
            e.preventDefault();
            editing ? editTask(editing) : createTask();
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
          <div className="form-buttons">
            <button className="form-button">
              {editing ? "Edit" : "Create"}
            </button>
            <button
              className="form-button form-button-secondary"
              type="reset"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task${task.done ? " done" : ""}`}>
              <input
                className="task-checkbox"
                type="checkbox"
                checked={!!task.done}
                onChange={(e) => checkTask(task.id, e.target.checked)}
              />
              <div className="task-text">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">{task.description}</p>
              </div>
              <div className="task-buttons">
                <button
                  className="task-button task-button-delete"
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
                <button
                  className="task-button task-button-edit"
                  onClick={() => handleEditing(task.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
