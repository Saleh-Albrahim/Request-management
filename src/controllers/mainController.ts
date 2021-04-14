import ErrorResponse from '../utils/errorResponse';
import PollModel from '../models/PollModel';
import asyncHandler from '../middleware/async';
import { Request, Response, NextFunction } from 'express';

// @desc    Render the main page
// @route   GET /
// @access    Public
export const getMainView = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.render('indexView');
});
