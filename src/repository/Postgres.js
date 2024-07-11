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

async function getPoints() {
  try {
    const query = 'SELECT * FROM trivia.users ORDER BY points DESC';
    const response = await pgClient.query(query);
    const parsedRows = response.rows.map((row) => {
      // Ensure score is parsed as a number if needed
      const points = parseInt(row.points); // or parseFloat() for decimal values
      // Construct and return parsed row object
      return {
        id: row.id,
        username: row.global_name,
        points: points ? points : 0,
      };
    });
    return parsedRows;
    // Return the query results (array of objects)
  } catch (error) {
    console.error('Error executing SQL query:', error);
  }
}

async function getHighScores() {
  try {
    const query = 'SELECT * FROM trivia.users ORDER BY record DESC';
    const response = await pgClient.query(query);
    const parsedRows = response.rows.map((row) => {
      // Ensure score is parsed as a number if needed
      const record = parseInt(row.record); // or parseFloat() for decimal values
      // Construct and return parsed row object
      return {
        id: row.id,
        username: row.global_name,
        record: record ? record : 0,
      };
    });
    return parsedRows;
    // Return the query results (array of objects)
  } catch (error) {
    console.error('Error executing SQL query:', error);
  }
}

async function getUserFromDB(id) {
  try {
    const query = 'SELECT * FROM trivia.users WHERE id = ' + id;
    const response = await pgClient.query(query);
    const parsedRows = response.rows.map((row) => {
      // Ensure score is parsed as a number if needed
      const points = parseInt(row.points); // or parseFloat() for decimal values
      // Construct and return parsed row object
      return {
        id: row.id,
        name: row.username,
        globalName: row.global_name,
        points: points,
      };
    });
    return parsedRows;
    // Return the query results (array of objects)
  } catch (error) {
    console.error('Error executing SQL query:', error);
  }
}

async function addUserToDB(author) {
  const query = 'INSERT INTO trivia.users (id, username, global_name) VALUES ($1, $2, $3)';
  const values = [author.id, author.username, author.globalName];
  pgClient
    .query(query, values)
    .then(console.log('user added: ', author.globalName))
    .catch((e) => console.error('Error executing query: ', e.stack));
}

async function awardPoint(id) {
  try {
    const query = `UPDATE trivia.users
        SET points = points + 1
        WHERE id = $1
        RETURNING points`;
    const values = [id];

    const res = await pgClient.query(query, values);
    const result = res.rows.length > 0 ? res.rows[0].points : 0;
    return result;
  } catch (err) {
    console.error('Error updating user points: ', err);
  }
}

async function updateHighScores() {
  try {
    const query = 'UPDATE trivia.users SET record = points WHERE points > record RETURNING record';
    const res = await pgClient.query(query);
    const result = res.rows;
    return result;
  } catch (err) {
    console.error('Error updating high scores: ', err);
  }
}

async function resetHighScores() {
  try {
    const query = 'UPDATE trivia.users SET points = 0';
    await pgClient.query(query);
  } catch (err) {
    console.error('Error resetting scores: ', err);
  }
}

async function checkForReset() {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();

  if (day === 1 && hours === 0) {
    await updateHighScores();
    await resetHighScores();
    console.log('Scores have been reset!');
  }
}

// Export the client and connection functions
module.exports = {
  pgClient,
  connectDB,
  disconnectDB,
  getPoints,
  getUserFromDB,
  addUserToDB,
  awardPoint,
  getHighScores,
};

setInterval(checkForReset, 3600000);
