import express, { Application, Request, Response, NextFunction } from 'express';
import 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/database';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import errorHandler from './middleware/error';
import cookieParser from 'cookie-parser';
import mainRoute from './routes/mainRoute';
import ordersRoute from './routes/ordersRoute';
import authRoute from './routes/authRoute';

// Load config
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

// Init the express server
const app: Application = express();

app.use(express.json());

app.use(morgan('short'));

connectDB();

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Cookie parser
app.use(cookieParser());

// Routes
app.use('/api/v1/', mainRoute);
app.use('/api/v1/orders', ordersRoute);
app.use('/api/v1/auth', authRoute);

// Handle all the errors
app.use(errorHandler);

const PORT: number = (process.env.PORT as any) || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`.yellow.bold);
});
