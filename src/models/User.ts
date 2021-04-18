import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import shortid from 'shortid';
import ms from 'ms';
import db from '../config/database';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const User = db.define('User', {
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => 'user',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.sync().then(() => {
    console.log('User table is created'.cyan.bold);
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

export default User;
