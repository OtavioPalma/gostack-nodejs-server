import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import sessionConfig from '../config/session';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureSession(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, sessionConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
