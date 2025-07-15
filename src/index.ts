import express, { Response } from 'express';
import { sequelize } from './config/sequelize.config.js';
import { ENV } from './config/env.config.js';
import authRoutes from './routes/auth.routes.js'

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
