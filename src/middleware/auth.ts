import jwt from 'jsonwebtoken';
import asycHandler from './async';
import ErrorResponse from '../utils/errorResponse';
import User from '../models/UserModel';
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
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorResponse(' غير مصرح لك الدخول الى هنا ☹', 401));
    }
});
// Grant accses to specifix roles
export const authorize = (...roles: any) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorize to access this route`, 403));
        }
        next();
    };
};

// Add User if exists
export const getLoginUser = asycHandler(async (req: any, res: Response, next: NextFunction) => {
    let token;

    // Check if it JWT
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next();
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            ignoreExpiration: true,
        });
        // Get the user with ID
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        console.log('err', err);
        return next(new ErrorResponse(' غير مصرح الدخول الى هنا :( ', 401, true));
    }
});
