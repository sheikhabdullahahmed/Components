import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'colors';

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log(`PostgreSQL Connected successfully via Prisma`.cyan.underline);
  } catch (error) {
    console.error(`PostgreSQL Connection Error: ${error.message}`.red.bold);
    console.log(`Please make sure your PostgreSQL database is running and DATABASE_URL in .env is correct.`.yellow);
  }
};

export default connectDB;
