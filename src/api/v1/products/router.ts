import { validateRequest } from '../../../middlewares/validate-request';
import { Router } from 'express';
import { create, destroy, find, getAll, update } from './controller';
import {
  checkingProductIdValidation,
  createProductsValidation,
  getAllProductsValidation,
  updateProductsValidation,
} from './validation';

const router = Router();
router.get('/', getAllProductsValidation, validateRequest, getAll);
router.get('/:id', checkingProductIdValidation, validateRequest, find);
router.post('/', createProductsValidation, validateRequest, create);
router.put('/:id', updateProductsValidation, validateRequest, update);
router.delete('/:id', checkingProductIdValidation, validateRequest, destroy);

export { router as productsRouter };
