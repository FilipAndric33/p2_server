import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env' });

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const accessKey = fs.readFileSync(
    path.resolve(__dirname, '../access_public.key'),
  );
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    res.status(401).json({ message: 'No authorization.' });
    return;
  }

  try {
    req.user = jwt.verify(accessToken, accessKey) as {
      id: number;
    };
    next();
  } catch (error) {
    if ((error as jwt.JsonWebTokenError).name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Token has expired.' });
      return;
    }
    console.log(error);
    res.status(500).json({ message: 'Internal server error.' });
    return;
  }
}
