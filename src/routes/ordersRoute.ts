import express from 'express';
const router = express.Router();

// Controllers
import { getOrders, getOrderByID, getOrdersType, addOrder, deleteOrder } from '../controllers/ordersController';

// Middleware
import { protect, authorize } from '../middleware/auth';

// @route /api/v1/orders
router.route('/').get(protect, authorize('admin'), getOrders).post(protect, authorize('admin'), addOrder);

router.route('/type').get(protect, authorize('admin'), getOrdersType);

// @route /api/v1/orders/:orderID
router.route('/:orderID').get(protect, getOrderByID).delete(protect, authorize('admin'), deleteOrder);

export default router;
