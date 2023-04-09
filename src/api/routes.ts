import { Router, Request, Response } from 'express';

const router = Router();

router.use('/v1/store', (req: Request, res: Response) => {
  res.send({ message: 'get all store' });
});

export { router as appRouter };
