const { Sequelize } = require('sequelize');

const connectDB = async () => {
    try {
        const sequelize = new Sequelize('master', 'sa', '123', {
            host: 'localhost',
            port: 1434,
            dialect: 'mssql',
        });
        await sequelize.authenticate();

        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default connectDB;
