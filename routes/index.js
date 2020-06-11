import express from 'express';

import ApiRouter from './ApiRoutes';
import AppRouter from './AppRoutes';
import Authentication from './Authentication';
import Session from '../middleware/SessionMiddleware';

const router = express.Router();

router.use(Authentication);

router.use('/app', [], AppRouter);
router.use('/', [Session], ApiRouter);

export default router;
