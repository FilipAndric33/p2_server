import pool from './poolSetup';

export async function createTables() {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR (100) NOT NULL,
        password VARCHAR (255) NOT NULL,
        email VARCHAR (255) NOT NULL UNIQUE
    );
  `;

  try {
    await pool.query(createTableQuery);
  } catch (error) {
    console.error(error);
  }
}
