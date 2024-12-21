import { controller } from './decorators/controller';
import { Request, Response } from 'express';
import { verifyToken } from '../middleware/tokenVerification';
import { use } from './decorators/use';
import { put, get } from '../routes/routeBinder';
import jwt from 'jsonwebtoken';

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
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'invalid refresh token' });
    }
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH!,
      ) as {
        id: number;
      };
      req.user = { id: decoded.id };

      const accessToken = jwt.sign(
        { id: req.user.id },
        process.env.JWT_SECRET!,
        {
          expiresIn: '30m',
        },
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 30 * 60 * 1000,
      });
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: 'Invalid or expired token.' });
    }
  }

  @get('/logout')
  async logout(res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully.' });
  }
}
