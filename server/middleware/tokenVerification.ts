import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '.env' });

interface JwtPayload {
  id: number;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No authorization.' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
