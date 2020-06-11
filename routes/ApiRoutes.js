import express from 'express';
import Authentication from './Authentication/index';
import Logout from '../controllers/Authentication/Logout';

const router = express.Router();

router.use('/', [], Authentication);

router.post('/logout', Logout);

export default router;
