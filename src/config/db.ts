const { Sequelize } = require('sequelize');

const connectDB = async () => {
    try {
        const sequelize = new Sequelize('request', 'sa', '123', {
            host: 'localhost',
            port: 1434,
            dialect: 'mssql',
        });
        await sequelize.authenticate();

        console.log('Connection has been established successfully'.green.bold);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default connectDB;
