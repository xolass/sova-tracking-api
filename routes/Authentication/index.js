import express from 'express';
import Login from '../../controllers/Authentication/Login';


const router = express.Router();

router.post('/login', Login);


export default router;
