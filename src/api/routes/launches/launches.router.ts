import express, { Request, Response } from 'express';
import * as LaunchService from './launches.service';

export const launchRouter = express.Router();

launchRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const launches = await LaunchService.getAllLaunches();
    res.status(200).json(launches);
  } catch (error) {
    res.status(500).send(error);
  }
});
