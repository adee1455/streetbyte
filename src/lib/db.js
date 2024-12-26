import mysql from 'mysql2/promise'; // Use the promise-based API
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const query = async ({ query, values }) => {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw error; // Throw the error to be caught by the caller
  } finally {
    connection.release();
  }
  
};
