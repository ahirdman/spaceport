import axios from 'axios';
import express, { Request, Response } from 'express';
import { load } from 'cheerio';
import { ILaunchData } from '../common/interface';

export const locationRouter = express.Router();

locationRouter.get('/:location', (req: Request, res: Response) => {
  const locationParam = req.params.location;
  const capitalQuery =
    locationParam.charAt(0).toUpperCase() + locationParam.slice(1);

  axios.get('https://spaceflightnow.com/launch-schedule/').then(response => {
    const html = response.data;
    const $ = load(html);
    const launchesLocation: ILaunchData[] = [];

    $(`div.missiondata:contains("${capitalQuery}")`, html).each(function () {
      const date = $(this).prev().children('.launchdate').text();
      const mission = $(this)
        .prev()
        .children('.mission')
        .text()
        .split(' • ')[1];
      const rocket = $(this).prev().children('.mission').text().split(' • ')[0];
      const site = $(this).text().split('Launch site: ')[1];
      const info = $(this).next().text().split(' [')[0];

      launchesLocation.push({
        date,
        mission,
        rocket,
        site,
        info,
      });
    });
    res.json(launchesLocation);
  });
});
