import pool from './poolSetup';

export async function createTables() {
  const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR (100) NOT NULL,
        password VARCHAR (255) NOT NULL,
        email VARCHAR (255) NOT NULL UNIQUE
    );
  `;

  const createUserWatchlistTable = `
  CREATE TABLE IF NOT EXISTS users_watchlist (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        content_id INT,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50),
        UNIQUE(user_id, content_id)    
    );
  `;

  try {
    await pool.query(createUsersTable);
    await pool.query(createUserWatchlistTable);
  } catch (error) {
    console.error(error);
  }
}
