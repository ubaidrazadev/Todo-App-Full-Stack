import Todo from '../models/Todo.js';


export const getTodos = async (req, res, next) => {
try {
const todos = await Todo.find().sort({ createdAt: -1 });
res.json(todos);
} catch (err) { next(err); }
};


export const createTodo = async (req, res, next) => {
try {
const { text, priority, tags } = req.body;
if (!text) return res.status(400).json({ message: 'Text is required' });
const todo = await Todo.create({ text, priority, tags });
res.status(201).json(todo);
} catch (err) { next(err); }
};


export const updateTodo = async (req, res, next) => {
try {
const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!todo) return res.status(404).json({ message: 'Not found' });
res.json(todo);
} catch (err) { next(err); }
};


export const deleteTodo = async (req, res, next) => {
try {
await Todo.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
} catch (err) { next(err); }
};