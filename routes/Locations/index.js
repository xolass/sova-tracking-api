import express from 'express';
import { insertNewLocationRoute } from '../../controllers/Location/create';
import { getLocationHistoryRoute } from '../../controllers/Location/getHistory';
import { getLastLocationRoute } from '../../controllers/Location/getLast';


const router = express.Router();

router.get('/history/:id?', getLocationHistoryRoute);
router.get('/:id?', getLastLocationRoute);
router.post('/', insertNewLocationRoute);


export default router;
