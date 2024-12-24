const mysql = require('mysql2/promise');

// Create a database connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Execute SQL queries using the pool
const query = async ({ query, values }) => {
  const connection = await pool.getConnection();
  try {
    console.log("Db Connected");
    const [results] = await connection.execute(query, values);
    connection.release();
    return results;
  } catch (error) {
    console.log("Db not Connected");
    throw Error(error.message);
  }
};

module.exports = { query };
