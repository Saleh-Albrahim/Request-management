import crypto from 'crypto';
import asyncHandler from '../middleware/async';
import UserModel from '../models/UserModel';
import PollModel from '../models/PollModel';
import ErrorResponse from '../utils/errorResponse';
import ms from 'ms';
import { Request, Response, NextFunction } from 'express';

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
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(new ErrorResponse(`الرجاء ادخال الاسم و الايميل و كلمة المرور`, 400));
    }
    email = email.toLowerCase();

    // Check if the email exists
    const userCheck = await UserModel.findOne({ email: email });

    if (userCheck) {
        return next(new ErrorResponse(`هذا المستخدم موجود من قبل`, 400));
    }

    // Create user in the db
    const user = await UserModel.create({
        username,
        email,
        password,
    });

    await convertCookieToLogin(req, res, user._id);

    sendTokenResponse(user, 200, res, 'تم التسجيل بنجاح', true);
});

// @desc      Login user
// @route     POST /auth/login
// @access    Public
export const loginUsers = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    if (req.user) {
        return res.redirect('/');
    }

    let { email, password, rememberMe } = req.body;

    // Check  if email entered and password
    if (!email || !password) {
        return next(new ErrorResponse(`الرجاء ادخال الايميل و كلمة المرور`, 400));
    }
    email = email.toLowerCase();

    // Bring the user from the DB
    const user = await UserModel.findOne({ email }).select('+password');

    // Check if the user exist
    if (!user) {
        return next(new ErrorResponse(`خطأ في الايميل او كلمة المرور`, 400));
    }

    // Check the password if match or not
    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse(`خطأ في الايميل او كلمة المرور`, 400));
    }

    await convertCookieToLogin(req, res, user.id);

    sendTokenResponse(user, 200, res, 'مرحبا بعودتك', rememberMe);
});

// @desc      Log user out / clear cookie
// @route     GET /auth/logout
// @access    Private
export const logout = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    await res.clearCookie('token');
    res.redirect('/');
});

// @desc      Render the forget password page
// @route     GET /auth/forgotpassword
// @access    Public
export const getforgotPasswordView = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    res.render('auth/forgotPasswordView');
});

// @desc      Update password
// @route     GET /api/v1/auth/updatepassword
// @access    Private
export const updatePassword = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;

    const user = await UserModel.findById(req.user.id).select('+password');

    if (!(await user.checkPassword(req.body.oldPassword))) {
        return next(new ErrorResponse('خطأ في كلمة المرور السابقة', 401));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendTokenResponse(user, 200, res, 'تم تغيير كلمة المرور بنجاح', true);
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
export const updateDetails = async (req: any, res: Response, next: NextFunction) => {
    try {
        const filesToUpdate = {
            username: req.body.username,
            email: req.body.email,
        };

        const user = await UserModel.findByIdAndUpdate(req.user.id, filesToUpdate, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: 'تم تعديل البيانات',
        });
    } catch (e) {
        if (e.code == 11000) {
            return next(new ErrorResponse('هذا الايميل موحود من قبل', 401));
        }
    }
};

const sendTokenResponse = (user: any, statusCode: number, res: Response, msg: string, rememberMe: boolean) => {
    const duration = rememberMe ? ms('30d') : ms('1d');

    // Create token
    const token = user.getSignedJwtToken(duration);

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

const convertCookieToLogin = async (req: any, res: Response, userID: number) => {
    const adminID = req.cookies.adminID;
    if (adminID) {
        await PollModel.updateMany({ adminID }, { adminID: userID });
    }
    await res.clearCookie('adminID');
};
