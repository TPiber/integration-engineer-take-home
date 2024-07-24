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

  const updateTask = async (id: string) => {
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...tasks.find((task) => task.id === id),
        done: true,
      }),
    });
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: true } : task))
    );
  };

  return (
    <div>
      <h1>Task Management App</h1>

      <div>
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <button onClick={createTask}>Create</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.done ? "Done" : "Not Done"}</p>
            <button onClick={() => updateTask(task.id)}>Update</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
