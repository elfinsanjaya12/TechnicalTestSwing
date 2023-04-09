import { body, param, query } from 'express-validator';

export const createProductsValidation = [
  body('title')
    .notEmpty()
    .withMessage('title is required')
    .bail()
    .isString()
    .withMessage('title must be an string')
    .bail()
    .isLength({ max: 150 })
    .withMessage('title must be less than 150'),
  body('storeId')
    .notEmpty()
    .withMessage('storeId is required')
    .bail()
    .isUUID()
    .withMessage('storeId must be an uuid format'),
  body('url')
    .notEmpty()
    .withMessage('url is required')
    .bail()
    .isString()
    .withMessage('url must be an string'),
  body('price')
    .notEmpty()
    .withMessage('price is required')
    .bail()
    .isFloat()
    .withMessage('price must be an string'),
  body('description')
    .notEmpty()
    .withMessage('description is required')
    .bail()
    .isString()
    .withMessage('description must be an string'),
];

export const getAllProductsValidation = [
  query('keyword').optional().isString().withMessage('limit must be an string'),
  query('limit').optional().isNumeric().withMessage('limit must be an integer'),
  query('page').optional().isNumeric().withMessage('page must be an integer'),
];

export const checkingProductIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('param id is required')
    .bail()
    .isUUID()
    .withMessage('param id must be an uuid format'),
];

export const updateProductsValidation = [
  param('id')
    .notEmpty()
    .withMessage('param id is required')
    .bail()
    .isUUID()
    .withMessage('param id must be an uuid format'),
  body('title')
    .notEmpty()
    .withMessage('title is required')
    .bail()
    .isString()
    .withMessage('title must be an string')
    .bail()
    .isLength({ max: 150 })
    .withMessage('title must be less than 150'),
  body('storeId')
    .notEmpty()
    .withMessage('storeId is required')
    .bail()
    .isUUID()
    .withMessage('storeId must be an uuid format'),
  body('url')
    .notEmpty()
    .withMessage('url is required')
    .bail()
    .isString()
    .withMessage('url must be an string'),
  body('description')
    .notEmpty()
    .withMessage('description is required')
    .bail()
    .isString()
    .withMessage('description must be an string'),
  body('price')
    .notEmpty()
    .withMessage('price is required')
    .bail()
    .isFloat()
    .withMessage('price must be an string'),
];
