import { NextFunction, Request, Response } from 'express';
import {
  getAllProducts,
  createProduct,
  getOnoProduct,
  updateProduct,
  deleteProduct,
} from '../../../services/sequelize/products';

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllProducts(req);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createProduct(req);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getOnoProduct(req);
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
    const result = await updateProduct(req);
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
    const result = await deleteProduct(req);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
