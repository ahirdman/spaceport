import puppeteer from 'puppeteer';

interface ILaunchData {
  launchDate: string;
  mission: string;
  brief: string;
}

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nasa.gov/launchschedule/', {
      waitUntil: 'networkidle0',
    });

    const cards = await page.$$('#ember14 > div > div.launch-event');

    const nasaLaunches: ILaunchData[] = [];

    for (const card of cards) {
      const missionEl = await card.$('div.launch-info > div.title');
      const mission = await (
        await missionEl?.getProperty('innerText')
      )?.jsonValue();

      const dateEl = await card.$('div.ember-view > div.date');
      const date = await (await dateEl?.getProperty('innerText'))?.jsonValue();

      const briefEl = await card.$('div.launch-info > div.description > p');
      const brief = await (
        await briefEl?.getProperty('innerText')
      )?.jsonValue();

      nasaLaunches.push({
        launchDate: typeof date === 'string' ? date : 'unknown',
        mission: typeof mission === 'string' ? mission : 'unknown',
        brief: typeof brief === 'string' ? brief : 'unknown',
      });
    }
    await browser.close();
  } catch (error) {
    console.log('Error:', error);
  }
})();
