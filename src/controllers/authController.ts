import crypto from 'crypto';
import asyncHandler from '../middleware/async';
import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';
import ms from 'ms';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc      Render the register page
// @route     GET /auth/register
// @access    Public
export const getRegisterView = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('auth/registerView');
});

// @desc      Render the login page
// @route     GET /auth/login
// @access    Public
export const getLoginView = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('auth/loginView');
});

// @desc      Register user
// @route     POST /auth/register
// @access    Public
export const registerUsers = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    if (req.user) {
        return res.redirect('/');
    }
    let { username, password, role } = req.body;

    if (!username || !password || !role) {
        return next(new ErrorResponse(`الرجاء ادخال الاسم و الايميل و كلمة المرور`, 400));
    }

    // Check if the username exists
    const userCheck = await User.findOne({
        where: {
            username,
        },
    });

    if (userCheck) {
        return next(new ErrorResponse(`هذا المستخدم موجود من قبل`, 400));
    }

    // Create user in the db
    const user: any = await User.create({
        username: username,
        password: password,
        role: role,
    });

    sendTokenResponse(user, 200, res, 'تم التسجيل بنجاح', true);
});

// @desc      Login user
// @route     POST /auth/login
// @access    Public
export const loginUsers = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    if (req.user) {
        return res.redirect('/');
    }

    console.log(`req.body`, req.body);
    let { username, password, rememberMe } = req.body;
    if (!rememberMe) {
        rememberMe = false;
    }
    // Check  if email entered and password
    if (!username || !password) {
        return next(new ErrorResponse(`الرجاء ادخال الايميل و كلمة المرور`, 400));
    }

    // Bring the user from the DB
    const user: any = await User.findOne({
        where: { username: username },
    });

    // Check if the user exist
    if (!user) {
        return next(new ErrorResponse(`خطأ في الايميل او كلمة المرور`, 401));
    }

    // Check the password if match or not
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next(new ErrorResponse(`خطأ في الايميل او كلمة المرور`, 401));
    }

    sendTokenResponse(user, 200, res, 'مرحبا بعودتك', rememberMe);
});

// @desc      Log user out / clear cookie
// @route     GET /auth/logout
// @access    Private
export const logout = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    await res.clearCookie('token');
    res.redirect('/');
});

// @desc      Update password
// @route     GET /api/v1/auth/updatepassword
// @access    Private
export const updatePassword = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;

    const user: any = await User.findByPk(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
        return next(new ErrorResponse('خطأ في كلمة المرور السابقة', 401));
    }
    await User.update(
        { password: newPassword },
        {
            where: {
                username: user.username,
            },
        },
    );

    sendTokenResponse(user, 200, res, 'تم تغيير كلمة المرور بنجاح', true);
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

        await User.update(
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

const sendTokenResponse = (user: any, statusCode: number, res: Response, msg: string, rememberMe: boolean) => {
    const duration = rememberMe ? ms('30d') : ms('1d');

    // Create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: duration,
    });

    const options = {
        expires: new Date(Date.now() + duration),
        httpOnly: false,
        secure: false,
    };

    if (process.env.NODE_ENV == 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        message: msg,
    });
};
