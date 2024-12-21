import { registerUser, authenticateUser } from '../utils';
import { Request, Response } from 'express';
import { controller } from './decorators/controller';
import { post } from '../routes/routeBinder';

@controller('')
export class RootController {
  @post('/register')
  async userRegister(req: Request, res: Response): Promise<void> {
    const { username, password, email } = req.body;

    try {
      if (!username || !password || !email) {
        res.status(400).json({ message: 'all of the fields are required.' });
      }

      const result = await registerUser(username, password, email);
      if (result) {
        res.status(200).json({ message: 'User created successfully.' });
      } else {
        res.status(500).json({ message: 'Server error with user creation.' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  @post('/login')
  async postLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const result = await authenticateUser(email, password);

      if (result) {
        res.status(200).json({ message: 'User login successful.' });
      } else {
        res.status(400).json({ message: 'Wrong credentials.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
}
