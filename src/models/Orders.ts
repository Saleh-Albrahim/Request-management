import { Sequelize, DataTypes } from 'sequelize';

const createOrdersTable = async (sequelize: Sequelize) => {
    const Orders = sequelize.define(
        'Orders',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
                allowNull: false,
            },
            order_type_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'order_types',
                    key: 'id',
                },
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM,
                values: ['مكتمل', 'قيد التنفيذ', 'ملغا', 'مؤجل', 'جديد'],
                defaultValue: 'جديد',
                allowNull: false,
            },
            comment: {
                type: DataTypes.TEXT,
                defaultValue: 'لا يوجد',
                allowNull: true,
            },
            date: {
                type: DataTypes.STRING,
            },
        },
        {
            underscored: true,
        },
    );

    Orders.sync().then(() => {
        console.log('Orders table is created');
    });

    const addDate = async (instance: any) => {
        instance.set('date', new Date().toJSON().slice(0, 10).replace(/-/g, '/'));
    };

    Orders.beforeCreate(addDate);

    Orders.beforeUpdate(addDate);

    return Orders;
};

export default createOrdersTable;
