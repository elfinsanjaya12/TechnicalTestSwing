import { Router, Request, Response } from 'express';

const router = Router();

import { uploadsRouter } from './v1/uploads/router';
import { storesRouter } from './v1/stores/router';

router.use('/v1/uploads', uploadsRouter);
router.use('/v1/stores', storesRouter);

export { router as appRouter };
