import { Response } from 'express';
import { customRequest } from '../interfaces';
import pool from '../postgres/poolSetup';

export const addToWatchlistService = async (
  req: customRequest,
  res: Response,
) => {
  const userId = req.user!.id;
  const contentId = req.params.id;
  const status = 'To watch';

  const query = `
    INSERT INTO "users_watchlist" (user_id, content_id, status)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, content_id) DO NOTHING
    `;

  await pool.query(query, [userId, contentId, status]);
  res.status(200).json({ message: 'Content added to watchlist successfully.' });
};
