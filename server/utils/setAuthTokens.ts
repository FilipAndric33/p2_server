import { Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export function setAuthTokens(
  res: Response,
  id: number,
  username: string,
  email: string,
) {
  const accessKey = fs.readFileSync(
    path.resolve(__dirname, '../access_private.key'),
  );
  const refreshKey = fs.readFileSync(
    path.resolve(__dirname, '../refresh_private.key'),
  );

  const accessToken = jwt.sign({ id: id }, accessKey, {
    algorithm: 'RS256',
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ id: id }, refreshKey, {
    algorithm: 'RS256',
    expiresIn: '7d',
  });

  res.status(200).json({
    message: 'User login successful.',
    accessToken: accessToken,
    refreshToken: refreshToken,
    id: id,
    username: username,
    email: email,
  });
}
