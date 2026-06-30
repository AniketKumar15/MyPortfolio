import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();
    console.log('Connected to DB');

    const userExists = await User.findOne({ email: 'admin@nexus.com' });
    if (userExists) {
      console.log('Admin user already exists. ID: admin@nexus.com | Pass: password123 (assuming it wasn\'t changed)');
      process.exit();
    }

    // We don't need to manually hash here because the User model has a pre-save hook in most MERN apps.
    // Let's check if the pre-save hook exists by just creating it.
    const admin = await User.create({
      name: 'Aniket',
      email: 'aniket@gmail.com',
      password: '12345678',
      role: 'admin'
    });
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();
