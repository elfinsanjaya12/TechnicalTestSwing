import { NextFunction, Request, Response } from 'express';
import { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { JWTService } from '../services/jwt';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { IJWT_PAYLOAD } from '../services/jwt/interfaces/jwt.interface';

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtPayload;
    }
  }
}

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) throw new UnauthorizedError();

    let jwtPayload: JwtPayload | null = null;

    try {
      jwtPayload = <IJWT_PAYLOAD>JWTService.verifyToken(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) throw new UnauthorizedError();
    }

    if (!jwtPayload) throw new UnauthorizedError();

    req.currentUser = jwtPayload;

    next();
  } catch (error) {
    next(error);
  }
};
