import { Sequelize, DataTypes } from 'sequelize';

const createOrderTypeTable = async (sequelize: Sequelize) => {
    const OrderType = sequelize.define(
        'OrderType',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            order_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            order_grade: {
                type: DataTypes.ENUM,
                values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                allowNull: false,
            },
        },
        {
            underscored: true,
        },
    );

    OrderType.sync().then(() => {
        console.log('OrderType table is created');
    });

    return OrderType;
};

export default createOrderTypeTable;
