import mongoose from 'mongoose';


const todoSchema = new mongoose.Schema({
text: { type: String, required: true, trim: true, maxlength: 300 },
completed: { type: Boolean, default: false },
priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
tags: { type: [String], default: [] }
}, { timestamps: true });


export default mongoose.model('Todo', todoSchema);