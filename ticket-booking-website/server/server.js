import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './utils/auth.js';

// Connect to PostgreSQL
connectDB();

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Better-Auth handler route
app.all('/api/auth/*', toNodeHandler(auth));

// Body Parser Middleware to read JSON
app.use(express.json());

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
const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold
  )
);
