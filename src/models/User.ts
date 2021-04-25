import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import shortid from 'shortid';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const createUserTable = async (sequelize: Sequelize) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM,
                values: ['user', 'admin', 'disabled'],
                allowNull: false,
                defaultValue: () => 'user',
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            underscored: true,
        },
    );

    User.sync().then(() => {
        console.log('User table is created'.green.bold);
    });

    const hashPasswordHook = async (instance: any) => {
        if (!instance.changed('password')) return;

        // Generate salt with 10 rounds
        const salt = await bcrypt.genSalt(10);

        //  Hash the password
        const hash = await bcrypt.hash(instance.get('password'), salt);
        instance.set('password', hash);
    };

    User.beforeCreate(hashPasswordHook);
    User.beforeUpdate(hashPasswordHook);

    return User;
};

export default createUserTable;
