import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';

// Configuring dotenv to load environment variables
dotenv.config({
  path: "./env"
});


const app = express();

import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/messages', messageRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
