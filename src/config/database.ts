import { Sequelize } from 'sequelize';
import createUsersTable from '../models/Users';
import createOrderTypeTable from '../models/OrderType';
import createOrdersTable from '../models/Orders';

export const db: any = {};

const connectDB = async () => {
    try {
        // @ts-expect-error
        const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            dialect: process.env.DATABASE_DIALECT,
        });

        db.sequelize = sequelize;
        db.Users = await createUsersTable(sequelize);
        db.OrderType = await createOrderTypeTable(sequelize);
        db.Orders = await createOrdersTable(sequelize);

        db.Users.hasMany(db.Orders, {
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
            foreignKey: 'user_id',
        });
        db.Orders.belongsTo(db.Users, { foreignKey: 'user_id' });

        db.OrderType.hasMany(db.Orders, {
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
            foreignKey: 'order_type_id',
        });
        db.Orders.belongsTo(db.OrderType, { foreignKey: 'order_type_id' });

        // Check the database connection
        await sequelize.authenticate();

        console.log(`Database connected ...`.cyan.bold);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
