import { ForbiddenError } from '../errors/forbidden-error';
import { NextFunction, Request, Response } from 'express';

export const authorization = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.currentUser!.role)) {
      throw new ForbiddenError(
        'ACCESS_DENIED',
        'user does not have role access'
      );
    }
    next();
  };
};
