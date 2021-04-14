import express from 'express';
import ErrorResponse from '../utils/errorResponse';
import { getRegisterView, getLoginView, registerUsers, loginUsers, getforgotPasswordView, updatePassword, updateDetails, logout } from '../controllers/authController';
import { protect, getLoginUser } from '../middleware/auth';

const router = express.Router();

router.route('/register').get(getLoginUser, getRegisterView).post(getLoginUser, registerUsers);

router.route('/login').get(getLoginUser, getLoginView).post(getLoginUser, loginUsers);

router.get('/logout', protect, logout);

router.get('/forgotpassword', getforgotPasswordView);

router.put('/updatedetails', protect, updateDetails);

router.post('/updatepassword', protect, updatePassword);

export default router;
