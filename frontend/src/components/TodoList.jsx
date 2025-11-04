import { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/TodoApi";
import { Button, Input, Empty, message, Spin, Typography, Card } from "antd";
import { DeleteOutlined, CheckCircleTwoTone, PlusOutlined } from "@ant-design/icons";
import "../index.css";

const { Title } = Typography;

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data } = await getTodos();
      if (Array.isArray(data)) setTodos(data);
      else if (data && Array.isArray(data.todos)) setTodos(data.todos);
      else setTodos([]);
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
    <div className="todo-wrapper">
      <Card className="todo-card">
        <Title level={2} className="app-title">📝 My Todo Tracker</Title>

        <div className="todo-input-group">
          <Input
            placeholder="Write a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPressEnter={handleAdd}
            className="todo-input"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="add-btn"
          >
            Add
          </Button>
        </div>

        {loading ? (
          <div style={{ marginTop: 50, textAlign: "center" }}>
            <Spin tip="Loading your tasks..." />
          </div>
        ) : Array.isArray(todos) && todos.length > 0 ? (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <div className="todo-left" onClick={() => handleToggle(todo)}>
                  {todo.completed && (
                    <CheckCircleTwoTone twoToneColor="#52c41a" className="check-icon" />
                  )}
                  <span className="todo-text">{todo.text}</span>
                </div>

                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  className="delete-btn"
                  onClick={() => handleDelete(todo._id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <Empty description="No tasks yet! Add your first one ✨" style={{ marginTop: 50 }} />
        )}
      </Card>
    </div>
  );
}
