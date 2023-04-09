import { body, param, query } from 'express-validator';

export const createStoresValidation = [
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .bail()
    .isString()
    .withMessage('name must be an string')
    .bail()
    .isLength({ max: 150 })
    .withMessage('name must be less than 150'),
  body('phone')
    .notEmpty()
    .withMessage('phone is required')
    .bail()
    .isString()
    .withMessage('phone must be an string')
    .bail()
    .isLength({ max: 13 })
    .withMessage('phone must be less than 13'),
  body('url')
    .notEmpty()
    .withMessage('url is required')
    .bail()
    .isString()
    .withMessage('url must be an string'),
  body('address')
    .notEmpty()
    .withMessage('address is required')
    .bail()
    .isString()
    .withMessage('address must be an string'),
  body('operationalTimeStart')
    .notEmpty()
    .withMessage('operationalTimeStart is required')
    .bail()
    .isNumeric()
    .withMessage('operationalTimeStart must be an number'),
  body('operationalTimeEnd')
    .notEmpty()
    .withMessage('operationalTimeEnd is required')
    .bail()
    .isNumeric()
    .withMessage('operationalTimeEnd must be an number'),
];

export const getAllStoresValidation = [
  query('keyword').optional().isString().withMessage('limit must be an string'),
  query('limit').optional().isNumeric().withMessage('limit must be an integer'),
  query('page').optional().isNumeric().withMessage('page must be an integer'),
];

export const checkingStoreIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('param id is required')
    .bail()
    .isUUID()
    .withMessage('param id must be an uuid format'),
];

export const updateStoresValidation = [
  param('id')
    .notEmpty()
    .withMessage('param id is required')
    .bail()
    .isUUID()
    .withMessage('param id must be an uuid format'),
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .bail()
    .isString()
    .withMessage('name must be an string')
    .bail()
    .isLength({ max: 150 })
    .withMessage('name must be less than 150'),
  body('phone')
    .notEmpty()
    .withMessage('phone is required')
    .bail()
    .isString()
    .withMessage('phone must be an string')
    .bail()
    .isLength({ max: 13 })
    .withMessage('phone must be less than 13'),
  body('url')
    .notEmpty()
    .withMessage('url is required')
    .bail()
    .isString()
    .withMessage('url must be an string'),
  body('address')
    .notEmpty()
    .withMessage('address is required')
    .bail()
    .isString()
    .withMessage('address must be an string'),
  body('operationalTimeStart')
    .notEmpty()
    .withMessage('operationalTimeStart is required')
    .bail()
    .isNumeric()
    .withMessage('operationalTimeStart must be an number'),
  body('operationalTimeEnd')
    .notEmpty()
    .withMessage('operationalTimeEnd is required')
    .bail()
    .isNumeric()
    .withMessage('operationalTimeEnd must be an number'),
];
