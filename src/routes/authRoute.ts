import express from 'express';
import ErrorResponse from '../utils/errorResponse';
import { registerUsers, loginUsers, updatePassword, updateDetails, logout, getLoginUser } from '../controllers/authController';
import { protect, checkLogin } from '../middleware/auth';

const router = express.Router();

router.route('/register').post(registerUsers);

router.route('/login').post(loginUsers);

router.get('/user', checkLogin, getLoginUser);

router.get('/logout', protect, logout);

router.put('/updatedetails', protect, updateDetails);

router.post('/updatepassword', protect, updatePassword);

export default router;
