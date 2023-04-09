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
router.get('/', getAllStoresValidation, getAll);
router.get('/:id', checkingStoreIdValidation, find);
router.post('/', createStoresValidation, validateRequest, create);
router.put('/:id', updateStoresValidation, update);
router.delete('/:id', checkingStoreIdValidation, destroy);

export { router as storesRouter };
