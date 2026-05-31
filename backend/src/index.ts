import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './configs';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Charset for Vietnamese support
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  }
  next();
});

// Static files for uploads
app.use('/uploads', express.static(path.resolve(process.cwd(), config.upload.dir)));

// API Routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🚀 WebBanHoaQua Backend API is running!                ║
║                                                          ║
║   📍 Server: http://localhost:${PORT}                     ║
║   📍 API:     http://localhost:${PORT}/api                ║
║   📍 Health:  http://localhost:${PORT}/api/health          ║
║                                                          ║
║   Environment: ${config.nodeEnv}                            ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);
});

export default app;
