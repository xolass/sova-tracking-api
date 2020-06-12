import express from 'express';
import { addNewDeviceRoute } from '../../controllers/Devices/create';
import { getDeviceRoute } from '../../controllers/Devices/get';


const router = express.Router();

router.get('/:id?', getDeviceRoute);
router.post('/', addNewDeviceRoute);


export default router;
