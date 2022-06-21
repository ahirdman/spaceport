import express, { Request, Response } from 'express';
import * as RocketService from './rockets.service';

export const rocketRouter = express.Router();

rocketRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const rockets = await RocketService.getAllRockets();
    res.status(200).json(rockets);
  } catch (error) {
    res.status(500).send(error);
  }
});

rocketRouter.get('/:rocket', async ({ params: { rocket } }, res: Response) => {
  try {
    const [rocketData] = await RocketService.getRocket(rocket);
    res.status(200).json(rocketData);
  } catch (error) {
    res.status(500).send(error);
  }
});
