import { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/TodoApi";
import { Button, Input, Empty, message } from "antd";
import { DeleteOutlined, CheckCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import "../index.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data } = await getTodos();
      setTodos(data);
    } catch {
      message.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return message.warning("Please enter a task!");
    try {
      await addTodo({ text });
      setText("");
      fetchTodos();
      message.success("Task added!");
    } catch {
      message.error("Error adding task");
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
      fetchTodos();
    } catch {
      message.error("Error updating task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
      message.success("Task deleted");
    } catch {
      message.error("Error deleting task");
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-card">
        <h1 className="app-title">✨ My Todo Tracker</h1>

        <div className="todo-input-group">
          <Input
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPressEnter={handleAdd}
            className="todo-input"
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="add-btn">
            Add
          </Button>
        </div>

        {todos.length === 0 ? (
          <Empty description="No tasks yet!" style={{ marginTop: 50 }} />
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
                onClick={() => handleToggle(todo)}
              >
                <span className="todo-text">
                  {todo.completed && <CheckCircleTwoTone twoToneColor="#52c41a" />} {todo.text}
                </span>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(todo._id);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
