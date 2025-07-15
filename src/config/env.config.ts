import dotenv from  'dotenv';
dotenv.config();

export const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3000'),
    DB: {
        HOST: process.env.DB_HOST!,
        PORT: parseInt(process.env.DB_PORT!),
        USER: process.env.DB_USER!,
        PASS: process.env.DB_PASS!,
        NAME: process.env.DB_NAME!,
    },

    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',

    REDIS_URL: process.env.REDIS_URL,

};