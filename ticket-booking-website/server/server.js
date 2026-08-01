import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { auth } from './utils/auth.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body Parser Middleware to read JSON
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Better-Auth handler route
app.all('/api/auth/*', (req, res) => {
  return auth.handler(req, res);
});

// Root route for sanity checks
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Express Backend API',
  });
});

// Catch-all middleware for 404 routes
app.use(notFound);

// Custom error handling middleware
app.use(errorHandler);

// Port setup
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold
  )
);
