import { Sequelize, DataTypes } from 'sequelize';

const createOrdersTable = async (sequelize: Sequelize) => {
    const Orders = sequelize.define(
        'Orders',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
            },
            order_type_id: {
                type: DataTypes.UUID,
            },
            order_status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            underscored: true,
        },
    );

    Orders.sync().then(() => {
        console.log('Orders table is created');
    });

    return Orders;
};

export default createOrdersTable;
