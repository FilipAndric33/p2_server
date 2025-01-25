import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const refreshTokenService = (req: Request, res: Response) => {
  const refreshKey = fs.readFileSync(
    path.resolve(__dirname, '../refresh_public.key'),
  );
  const accessKey = fs.readFileSync(
    path.resolve(__dirname, '../access_private.key'),
  );
  const authHeader = req.headers.authorization;
  const refreshToken = authHeader && authHeader.split(' ')[1];

  if (!refreshToken) {
    return res.status(401).json({ message: 'invalid refresh token' });
  }
  try {
    const decoded = jwt.verify(refreshToken, refreshKey) as {
      id: number;
    };
    req.user = { id: decoded.id };

    const accessToken = jwt.sign({ id: req.user.id }, accessKey, {
      algorithm: 'RS256',
      expiresIn: '15m',
    });
    return res.status(200).json({
      message: 'Token refreshed successfully.',
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
