import express from 'express';

import Authentication from './Authentication';
// import Locations from './Locations';

const router = express.Router();


router.use('/', Authentication);

// router.use('/locations', Locations);

export default router;
