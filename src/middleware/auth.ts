import jwt from 'jsonwebtoken';
import asycHandler from './async';
import ErrorResponse from '../utils/errorResponse';
import { db } from '../config/database';
import { Request, Response, NextFunction } from 'express';

// Protect routes
export const protect = asycHandler(async (req: any, res: Response, next: NextFunction) => {
    let token: string = '';

    // Check if it JWT
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
        return res.redirect('/auth/login');
    }
    try {
        // Verify token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string, {
            ignoreExpiration: true,
        });

        // Get the user with ID
        req.user = await db.Users.findOne({
            where: {
                id: decoded.id,
            },
        });

        if (!req.user) {
            return next(new ErrorResponse(' غير مصرح الدخول الى هنا ☹', 401));
        }

        next();
    } catch (err) {
        return next(new ErrorResponse(' غير مصرح لك الدخول الى هنا ☹', 401));
    }
});

// Grant accses to specifix roles
export const authorize = (...roles: any) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`غير مسموح لك الدخول الى هنا ☹`, 403));
        }
        next();
    };
};
