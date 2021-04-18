import { Sequelize } from 'sequelize';

const db = new Sequelize('request', 'sa', '123', {
    host: 'localhost',
    port: 6987,
    dialect: 'mssql',
});

export default db;
