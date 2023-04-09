import { NextFunction, Request, Response } from 'express';
import { uploadCloudinary } from '../../../services/sequelize/uploads';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await uploadCloudinary(req);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
