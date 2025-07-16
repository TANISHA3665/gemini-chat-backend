import { sequelize } from '../../libs/db.js';

export async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('✅ DB connected');
        await sequelize.sync(); // optional: pass { alter: true } or { force: false }
        console.log('✅ DB synced');
    } catch (err) {
        console.error('❌ DB connection error:', err);
        throw err;
    }
};