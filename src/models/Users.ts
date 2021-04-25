import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import shortid from 'shortid';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const createUsersTable = async (sequelize: Sequelize) => {
    const Users = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.STRING,
                defaultValue: shortid.generate(),
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

    Users.sync().then(() => {
        console.log('Users table is created');
    });

    const hashPasswordHook = async (instance: any) => {
        if (!instance.changed('password')) return;

        // Generate salt with 10 rounds
        const salt = await bcrypt.genSalt(10);

        //  Hash the password
        const hash = await bcrypt.hash(instance.get('password'), salt);
        instance.set('password', hash);
    };

    Users.beforeCreate(hashPasswordHook);

    Users.beforeUpdate(hashPasswordHook);

    return Users;
};

export default createUsersTable;
