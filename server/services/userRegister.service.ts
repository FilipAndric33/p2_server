import { registerUser } from '../utils';
import { userInterface } from '../interfaces';
import { Response } from 'express';

export const userRegisterService = async (
  { username, email, password }: userInterface,
  res: Response,
) => {
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'all of the fields are required.' });
  }

  if (await registerUser(username, email, password)) {
    return res.status(200).json({ message: 'User registered successfully.' });
  }
};
