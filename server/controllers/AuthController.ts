import { Request, Response } from 'express';
import { controller } from './decorators';
import { post } from '../routes/routeBinder';
import { userRegisterService, userLoginService } from '../services';

@controller('')
export class AuthController {
  @post('/register')
  async userRegister(req: Request, res: Response) {
    const { username, password, email } = req.body;

    try {
      await userRegisterService({ username, password, email }, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  @post('/login')
  async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      await userLoginService({ email, password }, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
}
