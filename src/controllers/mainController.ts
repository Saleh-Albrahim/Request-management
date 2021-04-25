import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

// @desc    Get all the orders types
// @route   GET /orders/type
// @access    Private
export const getOrdersType = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const types = await db.OrderType.findAll();

    res.json(types);
});

// @desc    Get all the orders types
// @route   GET /orders/:type
// @access    Private
export const getOrders = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const typeID = req.params.type;

    const orders = await db.Orders.findAll({
        where: {
            order_type_id: typeID,
        },
    });

    res.json(orders);
});
