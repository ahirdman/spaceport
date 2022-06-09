import express, { Request, Response } from 'express';
import * as LaunchService from './launches.service';

export const launchRouter = express.Router();

launchRouter.get('/all', (_req: Request, res: Response) => {
  try {
    const allLaunches = LaunchService.getAllLaunches();
    res.status(200).json(allLaunches);
  } catch (error) {
    res.status(500).send(error);
  }
});
