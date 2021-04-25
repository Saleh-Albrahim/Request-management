import { Sequelize } from 'sequelize';
import createUserTable from '../models/User';

export const db: any = {};

const connectDB = async () => {
    try {
        const sequelize = new Sequelize('request', 'sa', '123', {
            host: 'localhost',
            port: 6987,
            dialect: 'mssql',
        });

        db.sequelize = sequelize;
        db.User = await createUserTable(sequelize);

        // Check the database connection
        await sequelize.authenticate();

        console.log(`Database connected ...`.cyan.bold);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
