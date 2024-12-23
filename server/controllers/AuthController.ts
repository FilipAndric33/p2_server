import { controller } from './decorators/controller';
import { Request, Response } from 'express';
import { verifyToken } from '../middleware/tokenVerification';
import { use } from './decorators/use';
import { post, get } from '../routes/routeBinder';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import pool from '../postgres/poolSetup';

interface CustomRequest extends Request {
  user?: { id: number };
}

@controller('/auth')
export class AuthController {
  @post('/watchlist/:id')
  @use(verifyToken)
  async addToWatchlist(req: CustomRequest, res: Response) {
    const userId = req.user!.id;
    const contentId = req.params.id;
    const status = 'To watch';

    const query = `
    INSERT INTO "users_watchlist" (user_id, content_id, status)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, content_id) DO NOTHING
    `;

    try {
      await pool.query(query, [userId, contentId, status]);
      res
        .status(200)
        .json({ message: 'Content added to watchlist successfully.' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to add movie to watchlist.' });
    }
  }

  @get('/refresh')
  async refreshToken(req: Request, res: Response) {
    const refreshKey = fs.readFileSync(
      path.resolve(__dirname, '../refresh_public.key'),
    );
    const accessKey = fs.readFileSync(
      path.resolve(__dirname, '../access_private.key'),
    );
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader && authHeader.split(' ')[1];

    if (!refreshToken) {
      return res.status(401).json({ message: 'invalid refresh token' });
    }
    try {
      const decoded = jwt.verify(refreshToken, refreshKey) as {
        id: number;
      };
      req.user = { id: decoded.id };

      const accessToken = jwt.sign({ id: req.user.id }, accessKey, {
        algorithm: 'RS256',
        expiresIn: '15m',
      });
      res.status(200).json({
        message: 'Token refreshed successfully.',
        accessToken: accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: 'Invalid or expired token.' });
    }
  }
}
