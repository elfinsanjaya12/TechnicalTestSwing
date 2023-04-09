import { validateRequest } from '../../../middlewares/validate-request';
import { Router } from 'express';
import { create, destroy, find, getAll, update } from './controller';
import {
  checkingStoreIdValidation,
  createStoresValidation,
  getAllStoresValidation,
  updateStoresValidation,
} from './validation';

const router = Router();
router.get('/', getAllStoresValidation, validateRequest, getAll);
router.get('/:id', checkingStoreIdValidation, validateRequest, find);
router.post('/', createStoresValidation, validateRequest, create);
router.put('/:id', updateStoresValidation, validateRequest, update);
router.delete('/:id', checkingStoreIdValidation, validateRequest, destroy);

export { router as storesRouter };
