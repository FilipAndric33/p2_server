import { Request } from 'express';

export interface customRequest extends Request {
  user?: { id: number };
}
