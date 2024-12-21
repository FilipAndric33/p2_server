import { Response } from 'express';
import jwt from 'jsonwebtoken';

export function setAuthCookies(res: Response, id: number) {
  const accessToken = jwt.sign({ id: id }, process.env.JWT_SECRET!, {
    expiresIn: '1s',
  });

  const refreshToken = jwt.sign({ id: id }, process.env.JWT_SECRET_REFRESH!, {
    expiresIn: '7d',
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
