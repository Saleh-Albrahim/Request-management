import express from 'express';
const router = express.Router();

// Controllers
import { getOrders, getOrdersType } from '../controllers/ordersController';

// Middleware
import { protect, authorize } from '../middleware/auth';

router.route('/type').get(protect, authorize('admin'), getOrdersType);

router.route('/type/:type_id').get(protect, authorize('admin'), getOrders);

export default router;
