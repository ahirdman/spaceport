import axios from 'axios';
import cheerio from 'cheerio';
import { ILaunchData } from '../common/interface';

const launches: ILaunchData[] = [];

axios.get('https://spaceflightnow.com/launch-schedule/').then(response => {
  const html = response.data;
  const $ = cheerio.load(html);

  $('div.datename', html).each(function () {
    const date = $(this).children('.launchdate').text();
    const mission = $(this).children('.mission').text().split(' • ')[1];
    const rocket = $(this).children('.mission').text().split(' • ')[0];
    const site = $(this).next().text().split('Launch site: ')[1];
    const info = $(this).next().next().text().split(' [')[0];

    launches.push({
      date,
      mission,
      rocket,
      site,
      info,
    });
  });
});

export const getAllLaunches = () => launches;
