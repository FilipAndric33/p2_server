import { controller, use } from './decorators';
import { post } from '../routes/routeBinder';
import { verifyToken } from '../middleware/tokenVerification';
import { customRequest } from '../interfaces';
import { Response } from 'express';
import { fetchUsernameService } from '../services/fetchUsername.service';

@controller('/user')
export class UserController {
  @post('/fetchUsername')
  @use(verifyToken)
  async getUsername(req: customRequest, res: Response) {
    try {
      if (!(await fetchUsernameService(req, res))) {
        return res.status(401).json({ message: 'Nonexistent user. ' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error. ' });
    }
  }
}
