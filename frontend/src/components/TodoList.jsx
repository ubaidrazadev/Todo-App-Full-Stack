import { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/TodoApi";
import { Button, Input, message, Empty, Card, Spin, Typography } from "antd";
import { PlusOutlined, DeleteOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import "../index.css";

const { Title } = Typography;

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(Array.isArray(data) ? data : []);
    } catch {
      message.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return message.warning("Please enter a task!");
    try {
      await addTodo({ text });
      setText("");
      loadTodos();
      message.success("Task added successfully!");
    } catch {
      message.error("Couldn't add task");
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
      loadTodos();
    } catch {
      message.error("Couldn't update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
      message.success("Task deleted!");
    } catch {
      message.error("Couldn't delete task");
    }
  };

  return (
    <div className="todo-wrapper">
      <Card className="todo-card">
        <Title level={2} className="app-title">✨ My Todo Tracker</Title>

        <div className="todo-input-section">
          <Input
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPressEnter={handleAdd}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add
          </Button>
        </div>

        {loading ? (
          <Spin tip="Loading..." style={{ marginTop: 40 }} />
        ) : todos.length === 0 ? (
          <Empty description="No tasks yet!" style={{ marginTop: 50 }} />
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <div className="todo-left" onClick={() => handleToggle(todo)}>
                  {todo.completed && <CheckCircleTwoTone twoToneColor="#52c41a" />}
                  <span>{todo.text}</span>
                </div>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(todo._id)}
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
