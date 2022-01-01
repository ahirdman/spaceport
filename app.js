const PORT = process.env.PORT || 8000;
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

app.get('/', (req, res) => {
  res.json('Startpage');
});

app.get('/all', (req, res) => {
  res.json(launches);
});

// Endpoint for specific spacecrafts {rocket}
app.get('/rocket/:rocket', (req, res) => {
  const rocketParam = req.params.rocket;
  const capitalQuery =
    rocketParam.charAt(0).toUpperCase() + rocketParam.slice(1);

  axios.get('https://spaceflightnow.com/launch-schedule/').then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const rockets = [];

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

// Endpoint for launches from countries / states {location}
app.get('/location/:location', (req, res) => {
  const locationParam = req.params.location;
  const capitalQuery =
    locationParam.charAt(0).toUpperCase() + locationParam.slice(1);

  axios.get('https://spaceflightnow.com/launch-schedule/').then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const launchesLocation = [];

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

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
