import { Router } from 'express';
import { create } from './controller';

import uploadImageMiddleware from '../../../middlewares/upload-image';

const router = Router();
router.post('/', uploadImageMiddleware.single('file'), create);

export { router as uploadsRouter };
