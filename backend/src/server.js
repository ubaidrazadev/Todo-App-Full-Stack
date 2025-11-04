import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import todosRoutes from './routes/todos.js';
import { errorHandler } from './utils/errorHandler.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// health route
app.get('/', (req, res) => res.send('✅ Backend is running successfully!'));


app.use('/api/todos', todosRoutes);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('✅ MongoDB Connected');
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error('❌ Connection failed', err));