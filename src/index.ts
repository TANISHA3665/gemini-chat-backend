import express, { Request, Response } from 'express';
import { ENV } from './config/env.config.js';

import mainRoutes from './routes/index.js';

import { connectToDatabase, connectToRedis } from './libs/init/index.js';

import { errorHandler } from './middlewares/index.js';
import './queues/index.js';

const app = express();
app.use(express.json());

// Health check
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', environment: ENV.NODE_ENV });
});

// Routes
app.use('/api', mainRoutes);

app.use(errorHandler);

const startServer = async () => {
    try {
        await connectToDatabase();
        await connectToRedis();

        app.listen(ENV.PORT, () => {
            console.log(` Server running on http://localhost:${ENV.PORT}`);
        });
    } catch (err) {
        console.error('Server failed to start:', err);
        process.exit(1);
    }
};

startServer();
