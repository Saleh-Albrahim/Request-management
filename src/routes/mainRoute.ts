import express from 'express';
const router = express.Router();

// Controllers
import { getMainView, dashboard } from '../controllers/mainController';

// Middleware
import { protect, getLoginUser } from '../middleware/auth';

router.get('/', getMainView);

router.get('/dashboard', getLoginUser, dashboard);

export default router;
