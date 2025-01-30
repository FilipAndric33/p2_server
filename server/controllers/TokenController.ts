import { controller } from './decorators';
import { Request, Response } from 'express';
import { post } from '../routes/routeBinder';
import { refreshTokenService } from '../services';

@controller('/token')
export class TokenController {
  @post('/refresh')
  async refreshToken(req: Request, res: Response) {
    try {
      refreshTokenService(req, res);
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: 'Invalid or expired token.' });
    }
  }
}
