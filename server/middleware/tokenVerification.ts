import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '.env' });

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    res.status(401).json({ message: 'No authorization.' });
    return;
  }

  try {
    req.user = jwt.verify(accessToken, process.env.JWT_SECRET!) as {
      id: number;
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error.' });
    return;
  }
}
