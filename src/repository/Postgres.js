// Import the pg library
const { Client } = require('pg');
require('dotenv').config();

// Configure the PostgreSQL connection
const pgClient = new Client({
  user: process.env.POSTGRES_USER, // Your PostgreSQL username
  host: process.env.POSTGRES_HOST, // Your Raspberry Pi's IP address
  database: process.env.POSTGRES_DATABASE, // Your PostgreSQL database name
  password: process.env.POSTGRES_PASSWORD, // Your PostgreSQL password
  port: process.env.POSTGRES_PORT, // PostgreSQL default port
});

// Connect to the PostgreSQL server
async function connectDB() {
  try {
    await pgClient.connect();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
}

// Disconnect from the PostgreSQL server
async function disconnectDB() {
  try {
    await pgClient.end();
    console.log('Disconnected from PostgreSQL');
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL:', error);
  }
}

// Example query function
async function queryData() {
  try {
    const query = 'SELECT * FROM players';
    const result = await pgClient.query(query);
    console.log('Query results:');
    console.table(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    // Disconnect from the database
    //disconnectDB();
  }
}

// Export the client and connection functions
module.exports = {
  pgClient,
  connectDB,
  disconnectDB,
};
