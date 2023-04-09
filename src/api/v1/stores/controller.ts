import { NextFunction, Request, Response } from 'express';
import {
  getAllStores,
  createStore,
  getOnoStoreEbook,
  updateStore,
  deleteStore,
} from '../../../services/sequelize/stores';

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllStores(req);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createStore(req);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getOnoStoreEbook(req);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await updateStore(req);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await deleteStore(req);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
