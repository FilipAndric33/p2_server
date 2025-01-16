import { controller, use } from './decorators';
import { Response } from 'express';
import { customRequest } from '../interfaces';
import { verifyToken } from '../middleware/tokenVerification';
import { post } from '../routes/routeBinder';
import { addToWatchlistService } from '../services';

@controller('/content')
export class ContentController {
  @post('/watchlist/:id')
  @use(verifyToken)
  async addToWatchlist(req: customRequest, res: Response) {
    try {
      await addToWatchlistService(req, res);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Failed to add movie to watchlist.' });
    }
  }
}
