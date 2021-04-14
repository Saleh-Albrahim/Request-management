import express, { Application, Request, Response, NextFunction } from 'express';
import 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import db from './config/database';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import authRoute from './routes/authRoute';
import mainRoute from './routes/mainRoute';

// Load config
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

// Init the express server
const app: Application = express();

// Check the database connection
db.authenticate()
    .then(() => console.log(`Database connected ...`.cyan.bold))
    .catch((error) => console.log(`${error}`.red.bold));

app.use(express.json());

app.use(morgan('short'));

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Routes
app.use('/api/v1/', mainRoute);
app.use('/api/v1/auth', authRoute);

const PORT: number = (process.env.PORT as any) || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`.yellow.bold);
});
