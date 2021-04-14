import { Sequelize } from 'sequelize';

const db = new Sequelize('request', 'sa', '123', {
    host: 'localhost',
    port: 1435,
    dialect: 'mssql',
});

export default db;
