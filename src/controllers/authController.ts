import crypto from 'crypto';
import asyncHandler from '../middleware/async';
import { db } from '../config/database';
import ErrorResponse from '../utils/errorResponse';
import ms from 'ms';
import { Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc      Return the users list
// @route     GET /auth/users
// @access    Private
export const getUsersList = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    let users = await db.Users.findAll({ raw: true, attributes: ['id', 'username', 'role'] });

    return res.json(users);
});

// @desc      Return the login user
// @route     GET /auth/user
// @access    Private
export const getLoginUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const user = {
        username: req.user.dataValues.username,
        role: req.user.dataValues.role,
    };

    return res.json({
        user,
    });
});

// @desc      Register user
// @route     POST /auth/register
// @access    Public
export const registerUsers = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    let { username, password, role } = req.body;

    // TODO: Handle database errors

    if (!username || !password || !role) {
        return next(new ErrorResponse(`الرجاء ادخال الاسم و الايميل و كلمة المرور`, 400));
    }

    // Check if the username exists
    const userCheck = await db.Users.findOne({
        where: {
            username,
        },
    });

    if (userCheck) {
        return next(new ErrorResponse(`هذا المستخدم موجود من قبل`, 400));
    }

    // Create user in the db
    const user: any = await db.Users.create({
        username: username,
        password: password,
        role: role,
    });

    sendTokenResponse(user, 200, res, 'تم التسجيل بنجاح');
});

// @desc      Login user
// @route     POST /auth/login
// @access    Public
export const loginUsers = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    // Check  if email entered and password
    if (!username || !password) {
        return next(new ErrorResponse(`الرجاء ادخال الاسم و كلمة المرور`, 400));
    }

    // Bring the user from the DB
    const user: any = await db.Users.findOne({
        where: { username: username },
    });

    // Check if the user exist
    if (!user) {
        return next(new ErrorResponse(`خطأ في الاسم او كلمة المرور`, 401));
    }

    // Check the password if match or not
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next(new ErrorResponse(`خطأ في الاسم او كلمة المرور`, 401));
    }

    sendTokenResponse(user, 200, res, 'تم تسجيل الدخول بنجاح');
});

// @desc      Log user out / clear cookie
// @route     GET /auth/logout
// @access    Private
export const logout = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    await res.clearCookie('token');
    res.json({
        message: 'تم تسجيل الخروج بنجاح',
    });
});

// @desc      Update password
// @route     GET /api/v1/auth/updatepassword
// @access    Private
export const updatePassword = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;

    const user: any = await db.Users.findByPk(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
        return next(new ErrorResponse('خطأ في كلمة المرور السابقة', 401));
    }
    await db.Users.update(
        { password: newPassword },
        {
            where: {
                username: user.username,
            },
        },
    );

    sendTokenResponse(user, 200, res, 'تم تغيير كلمة المرور بنجاح');
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
export const updateDetails = async (req: any, res: Response, next: NextFunction) => {
    try {
        const filesToUpdate = {
            username: req.body.username,
            role: req.body.role,
        };

        await db.Users.update(
            { filesToUpdate },
            {
                where: {
                    username: req.body.username,
                },
            },
        );

        res.status(200).json({
            success: true,
            message: 'تم تعديل البيانات',
        });
    } catch (e) {
        return next(new ErrorResponse('هذا الايميل موحود من قبل', 401));
    }
};

const sendTokenResponse = (user: any, statusCode: number, res: Response, msg: string) => {
    const duration = ms('10y');

    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: duration,
    });

    const options = {
        expires: new Date(Date.now() + duration),
        httpOnly: true,
        secure: true,
    };

    if (process.env.NODE_ENV == 'production') {
        options.secure = true;
    }

    user = {
        username: user.username,
        role: user.role,
    };
    res.status(statusCode).cookie('token', token, options).json({
        user,
        message: msg,
    });
};
