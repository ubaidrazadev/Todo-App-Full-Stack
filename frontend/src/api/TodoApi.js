import axios from "axios";

// 👇 apna deployed backend URL yahaan daalo:
const API_URL = "https://your-backend.vercel.app/api/todos";

export const getTodos = async () => {
  const res = await axios.get(API_URL);
  return Array.isArray(res.data) ? res.data : [];
};

export const addTodo = async (todo) => {
  const res = await axios.post(API_URL, todo);
  return res.data;
};

export const updateTodo = async (id, updated) => {
  const res = await axios.put(`${API_URL}/${id}`, updated);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
