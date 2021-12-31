const PORT = process.env.PORT || 8000; // Deply on roku
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const launches = [];

axios.get('https://spaceflightnow.com/launch-schedule/').then(response => {
  const html = response.data;
  const $ = cheerio.load(html);

  $('div.datename', html).each(function () {
    const date = $(this).children('.launchdate').text();
    const headerArr = $(this).children('.mission').text().split(' • ');
    const siteArr = $(this).next().text().split('Launch site: ');
    const infoArr = $(this).next().next().text().split(' [');

    const mission = headerArr[1];
    const rocket = headerArr[0];
    const site = siteArr[1];
    const info = infoArr[0];

    launches.push({
      date,
      mission,
      rocket,
      site,
      info,
    });
  });

  app.get('/', (req, res) => {
    res.json('Startpage');
  });

  app.get('/launches', (req, res) => {
    res.json(launches);
  });
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
