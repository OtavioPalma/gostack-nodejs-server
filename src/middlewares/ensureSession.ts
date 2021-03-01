import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import sessionConfig from '../config/session';
import AppError from '../errors/AppError';

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
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, sessionConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
