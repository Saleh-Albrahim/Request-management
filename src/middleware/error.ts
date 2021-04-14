import { Request, Response, NextFunction } from 'express';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    // Log to console for dev
    console.log(error);

    const errorStatus = error.statusCode || 500;

    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: error.message || 'مشكلة في السيرفر',
    });
};

export default errorHandler;
