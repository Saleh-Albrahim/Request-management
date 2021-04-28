import express from 'express';
const router = express.Router();

// Controllers
import { getOrders, getOrdersType, addOrder } from '../controllers/ordersController';

// Middleware
import { protect, authorize } from '../middleware/auth';

// @route /api/v1/orders
router.route('/').get(protect, authorize('admin'), getOrders).post(protect, authorize('admin'), addOrder);

router.route('/type').get(protect, authorize('admin'), getOrdersType);

export default router;
