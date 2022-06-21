import express, { NextFunction, Request, Response } from 'express';
import * as LaunchService from './launches.service';

export const launchRouter = express.Router();

launchRouter.get('/all', async (_req: Request, res: Response, next: NextFunction) => {
  const launches = await LaunchService.getAllLaunches();
  if (!launches) next();

  res.status(200).json(launches);
});
