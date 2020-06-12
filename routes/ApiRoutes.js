import express from 'express';
import Authentication from './Authentication';
import Locations from './Locations';
import Devices from './Devices';
import Logout from '../controllers/Authentication/Logout';

const router = express.Router();

router.post('/logout', [], Logout);

router.use('/location', [], Locations);

router.use('/device', [], Devices);

router.use('/', [], Authentication);


export default router;
