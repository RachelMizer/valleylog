import { useEffect, useState } from "react";
import { addTask, deleteTask, listTasks, updateTask } from "../api";

const CATEGORY_ORDER = ["Daily", "Weekly", "Quest", "Other"];

export default function TasksTab() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newText, setNewText] = useState("");
  const [newCategory, setNewCategory] = useState("Daily");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("Daily");

  useEffect(() => {
    listTasks().then(setTasks).finally(() => setLoading(false));
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const text = newText.trim();
    if (!text) return;
    const created = await addTask(text, newCategory);
    setTasks(ts => [...ts, created]);
    setNewText("");
  }

  async function handleToggle(id, done) {
    setTasks(ts => ts.map(t => (t.id === id ? { ...t, done } : t)));
    await updateTask(id, { done });
  }

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks(ts => ts.filter(t => t.id !== id));
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditText(task.text);
    setEditCategory(task.category);
  }

  async function saveEdit(id) {
    const text = editText.trim();
    if (text) {
      const updated = await updateTask(id, { text, category: editCategory });
      setTasks(ts => ts.map(t => (t.id === id ? updated : t)));
    }
    setEditingId(null);
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <form className="panel-toolbar" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="New task..."
          value={newText}
          onChange={e => setNewText(e.target.value)}
          required
        />
        <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
          {CATEGORY_ORDER.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit">+ Add Task</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-state">No tasks yet — add one above.</p>
      ) : (
        CATEGORY_ORDER.map(category => {
          const group = tasks.filter(t => t.category === category);
          if (group.length === 0) return null;
          return (
            <div className="task-group" key={category}>
              <h3>{category}</h3>
              {group.map(task => (
                <div className={`task-item${task.done ? " done" : ""}`} key={task.id}>
                  {editingId === task.id ? (
                    <>
                      <input
                        type="text"
                        className="task-edit-text"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                      />
                      <select value={editCategory} onChange={e => setEditCategory(e.target.value)}>
                        {CATEGORY_ORDER.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <button type="button" className="btn-compact" onClick={() => saveEdit(task.id)}>Save</button>
                      <button type="button" className="secondary btn-compact" onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={e => handleToggle(task.id, e.target.checked)}
                      />
                      <span>{task.text}</span>
                      <button type="button" className="secondary btn-compact" onClick={() => startEdit(task)}>Edit</button>
                      <button type="button" className="danger btn-compact" onClick={() => handleDelete(task.id)}>Delete</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}
