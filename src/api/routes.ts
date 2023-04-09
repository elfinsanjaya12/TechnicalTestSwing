import { Router } from 'express';

const router = Router();

import { uploadsRouter } from './v1/uploads/router';
import { storesRouter } from './v1/stores/router';
import { productsRouter } from './v1/products/router';

router.use('/v1/uploads', uploadsRouter);
router.use('/v1/stores', storesRouter);
router.use('/v1/products', productsRouter);

export { router as appRouter };
