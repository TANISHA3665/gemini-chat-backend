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

    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    DOMAIN: 'http://localhost:3000'
};