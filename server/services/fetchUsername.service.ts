import { Response } from 'express';
import { customRequest } from '../interfaces';
import pool from '../postgres/poolSetup';
import { userInterface } from '../interfaces';
import { QueryResult } from 'pg';

export const fetchUsernameService = async (
  req: customRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;

    const query = `SELECT * FROM users WHERE id=$1`;

    const { rows }: QueryResult<userInterface> = await pool.query(query, [
      userId,
    ]);
    if (rows.length === 0) {
      return undefined;
    }
    return res.status(200).json({ username: rows[0].username });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error. ' });
  }
};
