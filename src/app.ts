import express, { type Application } from 'express';
import cors from 'cors';
import { appRoutes } from './app/routes';

const app: Application = express();

// --- parsers --- //
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:3000'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);
// app.use(cookieParser());

// ----- root route ----- //
app.get('/', (_, res) => {
  res.send({ message: 'Accord AI server is running...' });
});

// --- routes --- //
app.use('/api', appRoutes);

// ----- global error handler ----- //
// app.use(globalErrorHandler);

// ----- API not found handler ----- //
// app.use(notFound);

export default app;
