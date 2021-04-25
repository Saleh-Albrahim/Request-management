import { timeStamp } from 'node:console';
import { Sequelize, DataTypes } from 'sequelize';
import shortid from 'shortid';

const createOrderTypeTable = async (sequelize: Sequelize) => {
    const OrderType = sequelize.define(
        'OrderType',
        {
            id: {
                type: DataTypes.STRING,
                defaultValue: shortid.generate(),
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            grade: {
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
