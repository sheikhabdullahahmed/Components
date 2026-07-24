import mongoose from 'mongoose';
import dns from 'dns';

// Resolve DNS querySrv ECONNREFUSED issue by using public DNS servers
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo-db';
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

