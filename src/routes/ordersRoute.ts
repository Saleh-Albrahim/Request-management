import express from 'express';
const router = express.Router();

// Controllers
import { getOrders, getOrdersType } from '../controllers/ordersController';

// Middleware
import { protect, authorize } from '../middleware/auth';

router.route('/').get(protect, authorize('admin'), getOrders);

router.route('/type').get(protect, authorize('admin'), getOrdersType);

export default router;
