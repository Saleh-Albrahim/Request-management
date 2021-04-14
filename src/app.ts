import express, { Application, Request, Response, NextFunction } from 'express';
import 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';

// Load config
dotenv.config({ path: './config/config.env' });

// Init the express server
const app: Application = express();

// Connect to the database
connectDB();

app.use(express.json());

app.use(morgan('short'));

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

app.get('/', (req, res, next) => {
    res.json('Hey');
});

const PORT: number = (process.env.PORT as any) || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`.yellow.bold);
});
