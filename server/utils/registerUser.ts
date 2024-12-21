import pool from '../postgres/poolSetup';
import { hashPassword } from '../config/bcryptConfig';

export async function registerUser(
  username: string,
  password: string,
  email: string,
) {
  const hashedPass = hashPassword(password);

  const query = `
      INSERT INTO users (username, password, email) 
      VALUES ($1, $2, $3)
      RETURNING id, username, email
      `;

  const values = [username, hashedPass, email];
  const result = await pool.query(query, values);

  return !!result.rows.length;
}
