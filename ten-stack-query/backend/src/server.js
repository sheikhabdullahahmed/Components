import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import todoRoutes from './routes/todoRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Allow requests from React frontend
app.use(express.json()); // Allow parsing JSON body

// API Routes
app.use('/api/todos', todoRoutes);

// Base route / health check
app.get('/', (req, res) => {
  res.json({ message: 'Todo CRUD API is running successfully' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
