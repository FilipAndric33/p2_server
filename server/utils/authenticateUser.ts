import { matchPassword } from '../config/bcryptConfig';
import { QueryResult } from 'pg';
import { UserInterface } from '../interfaces/userInterface';
import pool from '../postgres/poolSetup';

export async function authenticateUser(
  email: string,
  password: string,
): Promise<boolean> {
  const query = `SELECT * FROM "users" WHERE email = $1`;

  const { rows }: QueryResult<UserInterface> = await pool.query(query, [
    email,
  ]);
  if (rows.length === 0) {
    return false;
  }

  const hashedPass = rows[0].password;

  return !!(hashedPass && (await matchPassword(password, hashedPass)));
}
