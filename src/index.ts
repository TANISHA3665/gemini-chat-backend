import express, { Response } from 'express';
import { ENV } from './config/env.config.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import chatroomRoutes from './routes/chatroom.routes.js';
import { sequelize } from './libs/db.js';

// Init Express App
const app = express();

// Middlewares
app.use(express.json());

// Health Check
app.get('/health', (res: Response) => {
    res.status(200).json({ status: 'OK', environment: ENV.NODE_ENV });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chatroom', chatroomRoutes);

// Start Server
const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected');

        await sequelize.sync();
        console.log('Sequelize synced');

        app.listen(ENV.PORT, () => {
            console.log(`Server running on http://localhost:${ENV.PORT}`);
        });
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};

start();
