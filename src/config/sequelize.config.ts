import { Sequelize } from 'sequelize';
import { ENV } from './env.config.js';

export const sequelize = new Sequelize(
    ENV.DB.NAME,
    ENV.DB.USER,
    ENV.DB.PASS,
    {
    dialect: 'postgres',
    host: ENV.DB.HOST,
    port: ENV.DB.PORT,
    logging: ENV.NODE_ENV !== 'production',
});
