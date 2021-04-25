import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

// @desc    Get all the orders types
// @route   GET /orders/type
// @access    Private
export const getOrdersType = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const types = await db.OrderType.findAll({
        raw: true,
    });

    res.json(types);
});

// @desc    Get all the orders types
// @route   GET /orders/:type
// @access    Private
export const getOrders = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const typeID = req.query.type;

    console.log(`typeID`, typeID);

    let orders = [];

    if (!typeID) {
        orders = await db.Orders.findAll({
            raw: true,
            order: [['createdAt', 'ASC']],
            include: [
                {
                    model: db.OrderType,
                    attributes: ['id', 'name'],
                },
                {
                    model: db.Users,
                    attributes: ['id', 'username'],
                },
            ],
        });
    } else {
        orders = await db.Orders.findAll({
            raw: true,
            order: [['createdAt', 'ASC']],
            where: {
                order_type_id: typeID,
            },
            include: [
                {
                    model: db.OrderType,
                    attributes: ['id', 'name'],
                },
                {
                    model: db.Users,
                    attributes: ['id', 'username'],
                },
            ],
        });
    }

    res.json(orders);
});
