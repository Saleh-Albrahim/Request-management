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
                type: DataTypes.STRING,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            order_type_id: {
                type: DataTypes.STRING,
                references: {
                    model: 'order_types',
                    key: 'id',
                },
            },
            status: {
                type: DataTypes.ENUM,
                values: ['مكتمل', 'قيد التنفيذ', 'ملغا', 'مؤجل', 'جديد'],
                defaultValue: 'جديد',
                allowNull: false,
            },
            notes: {
                type: DataTypes.TEXT,
                defaultValue: 'لا يوجد',
                allowNull: true,
            },
            date: {
                type: DataTypes.DATEONLY,
                defaultValue: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
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
