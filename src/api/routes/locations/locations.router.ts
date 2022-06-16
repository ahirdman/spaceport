import express, { Request, Response } from 'express';
import * as LocationService from './locations.service';

export const locationRouter = express.Router();

locationRouter.get('/all', async (_req: Request, res: Response) => {
  try {
    const locations = await LocationService.getAllLocations();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).send(error);
  }
});
