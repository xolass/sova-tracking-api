import express from 'express';
import Login from '../controllers/Authentication/Login';
// import Logout from '../controllers/Authentication/Logout';


const router = express.Router();

router.post('/login', Login);

// router.post('/logout', Logout);


export default router;
