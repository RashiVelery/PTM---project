import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const fetchTasks = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        await API.post("/tasks", { title, description });
        setTitle("");
        setDescription("");
        fetchTasks();
    };

    const handleDelete = async (id) => {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
    };

    const handleEdit = (task) => {
        setEditingId(task._id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleUpdate = async (id) => {
        await API.put(`/tasks/${id}`, {
            title: editTitle,
            description: editDescription,
        });
        setEditingId(null);
        fetchTasks();
    };

    const handleToggle = async (task) => {
        await API.put(`/tasks/${task._id}`, {
            completed: !task.completed,
        });

        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = async () => {
        await API.post("/auth/logout");
        window.location.href = "/login";
    };



    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <hr />
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <button type="submit">Add Task</button>
            </form>

            <hr />

            {tasks.map((task) => (
                <div key={task._id}>
                    {editingId === task._id ? (
                        <>
                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <br />
                            <input
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                            <br />
                            <button onClick={() => handleUpdate(task._id)}>
                                Save
                            </button>
                            <button onClick={() => setEditingId(null)}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggle(task)}
                            />

                            
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <button onClick={() => handleEdit(task)}>Edit</button>
                            <button onClick={() => handleDelete(task._id)}>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
