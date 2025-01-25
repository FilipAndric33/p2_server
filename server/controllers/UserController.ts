import { controller, use } from './decorators';
import { get } from '../routes/routeBinder';
import { verifyToken } from '../middleware/tokenVerification';
import { customRequest } from '../interfaces';
import { Response } from 'express';
import { fetchUsernameService } from '../services/fetchUsername.service';

@controller('/user')
export class UserController {
  @get('/fetchUsername')
  @use(verifyToken)
  async getUsername(req: customRequest, res: Response) {
    try {
      if (!(await fetchUsernameService(req, res))) {
        res.status(401).json({ message: 'Nonexistent user. ' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error. ' });
    }
  }
}
