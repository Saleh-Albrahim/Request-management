import express from 'express';
const router = express.Router();
import db from '../config/database';
import User from '../models/User';

// // Controllers
// import {} from '../controllers/mainController';

// Middleware
import { protect } from '../middleware/auth';

export default router;
