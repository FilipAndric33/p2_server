import pool from '../postgres/poolSetup';
import { QueryResult } from 'pg';
import { UserInterface } from '../interfaces/userInterface';

export async function findUserByMail(email: string): Promise<UserInterface | undefined>  {
  const query = `SELECT * FROM "users" WHERE email=$1`;

  const { rows }: QueryResult<UserInterface> = await pool.query(query, [
    email,
  ]);
  if (rows.length === 0) {
    return;
  }

  return rows[0];
}