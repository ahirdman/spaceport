import axios from 'axios';
import express, { Request, Response } from 'express';
import { load } from 'cheerio';
import { ILaunchData } from '../../common/interface';

export const rocketRouter = express.Router();

rocketRouter.get('/:rocket', (req: Request, res: Response) => {
  const rocketParam = req.params.rocket;
  const capitalQuery = rocketParam.charAt(0).toUpperCase() + rocketParam.slice(1);

  axios.get('https://spaceflightnow.com/launch-schedule/').then(response => {
    const html = response.data;
    const $ = load(html);
    const rockets: ILaunchData[] = [];

    $(`div.datename:contains("${capitalQuery}")`, html).each(function () {
      const date = $(this).children('.launchdate').text();
      const mission = $(this).children('.mission').text().split(' • ')[1];
      const rocket = $(this).children('.mission').text().split(' • ')[0];
      const site = $(this).next().text().split('Launch site: ')[1];
      const info = $(this).next().next().text().split(' [')[0];

      rockets.push({
        date,
        mission,
        rocket,
        site,
        info,
      });
    });
    res.json(rockets);
  });
});
