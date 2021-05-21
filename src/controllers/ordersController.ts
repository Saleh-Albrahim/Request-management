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

// @desc    Get all the orders by there types
// @route   GET /orders
// @access    Private
export const getOrders = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const typeID = req.query.type;

    let orders = [];

    if (!typeID) {
        orders = await db.Orders.findAll({
            raw: true,
            order: [['createdAt', 'DESC']],
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

// @desc    Get one order by it's id
// @route   GET orders/:orderID
// @access    public
export const getOrderByID = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const id = req.params.orderID;

    console.log(`req.orderID`, req.params.orderID);

    const order = await db.Orders.findAll({
        raw: true,
        where: {
            id,
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

    res.json({
        type: order[0]['OrderType.name'],
        user: order[0]['user.username'],
        comment: order[0].comment,
    });
});

// @desc    Add new order
// @route   POST /orders
// @access    Private
export const addOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let { type, user, comment } = req.body;

    if (!type || !user) {
        return next(new ErrorResponse('الرجاء اكمال جميع الحقول', 400));
    }

    if (!comment) {
        comment = 'لا يوجد ملاحضات';
    }

    await db.Orders.create({
        user_id: user,
        order_type_id: type,
        comment: comment,
    });
    res.json({
        message: 'تم إضافة الطلب بنجاح',
    });
});

// @desc    delete order
// @route   DELETE /orders/:orderID
// @access    Private
export const deleteOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.orderID;

    await db.Orders.destroy({
        where: {
            id,
        },
    });
    res.json({
        message: 'تم حذف الطلب بنجاح',
    });
});
