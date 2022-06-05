import express, { Application } from 'express';
import { launchRouter } from './launches/launches.router';
import { locationRouter } from './locations/locations.router';
import { notFoundHandler } from './middleware/404.middleware';
import { errorHandler } from './middleware/error.middleware';
import { rocketRouter } from './rockets/rockets.router';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/launches', launchRouter);
app.use('/api/rockets', rocketRouter);
app.use('/api/locations', locationRouter);

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
