import express, { Application, Request, Response, NextFunction } from 'express';
import 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDB from './config/db';

// Load config
dotenv.config({ path: './config/config.env' });

connectDB();

const app: Application = express();

app.get('/', (req, res, next) => {
    res.json('Hey');
});

const PORT: number = (process.env.PORT as any) || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`.yellow.bold);
});
