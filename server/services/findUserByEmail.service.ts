import pool from '../postgres/poolSetup';
import { QueryResult } from 'pg';
import { userInterface } from '../interfaces';

export async function findUserByEmailService(
  email: string,
): Promise<userInterface | undefined> {
  const query = `SELECT * FROM "users" WHERE email=$1`;

  const { rows }: QueryResult<userInterface> = await pool.query(query, [email]);
  if (rows.length === 0) {
    return;
  }

  return rows[0];
}
