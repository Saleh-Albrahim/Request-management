import express from 'express';
import { registerUsers, loginUsers, updatePassword, updateDetails, logout, getLoginUser, getUsersList } from '../controllers/authController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.route('/register').post(registerUsers);

router.route('/login').post(loginUsers);

router.get('/user', protect, getLoginUser);

router.get('/users', protect, authorize('admin'), getUsersList);

router.get('/logout', logout);

router.put('/updatedetails', protect, updateDetails);

router.post('/updatepassword', protect, updatePassword);

export default router;
