import express from 'express';
const router = express.Router();
import db from '../config/database';
import User from '../models/Users';

// Controllers
import { getOrdersType } from '../controllers/mainController';

// Middleware
import { protect, authorize } from '../middleware/auth';

router.route('/order/type').get(protect, authorize('admin'), getOrdersType);

export default router;
