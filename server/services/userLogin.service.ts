import { findUserByMail, setAuthTokens } from '../utils';
import { matchPassword } from '../config/bcryptConfig';
import { Response } from 'express';

interface props {
  email: string;
  password: string;
}

export const userLoginService = async (
  { email, password }: props,
  res: Response,
) => {
  const user = await findUserByMail(email);
  if (!user) {
    return res.status(404).json({ message: 'invalid credentials' });
  }

  const isMatching = await matchPassword(password, user.password);
  if (!isMatching) {
    return res.status(404).json({ message: 'invalid credentials' });
  }

  setAuthTokens(res, user.id!);
};
