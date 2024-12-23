import { controller } from './decorators/controller';
import { Request, Response } from 'express';
import { verifyToken } from '../middleware/tokenVerification';
import { use } from './decorators/use';
import { put, get } from '../routes/routeBinder';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

interface CustomRequest extends Request {
  user?: { id: number };
}

@controller('/auth')
export class AuthController {
  @put('/watchlist/:id')
  @use(verifyToken)
  async addToWatchlist(req: CustomRequest, res: Response) {}

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
      res.status(200).json({ message: 'Token refreshed successfully.' });
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: 'Invalid or expired token.' });
    }
  }
}
