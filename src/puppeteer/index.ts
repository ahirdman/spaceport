import puppeteer from 'puppeteer';

interface ILaunchData {
  launchDate: string;
  mission: string;
  description: string;
}

(async () => {
  const nasaLaunches: ILaunchData[] = [];

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nasa.gov/launchschedule/', {
      waitUntil: 'networkidle0',
    });

    const cards = await page.$$('#ember14 > div > div.launch-event');

    for (const card of cards) {
      const dateEl = await card.$('div.ember-view > div.date');
      const dateFull: string | undefined = await (
        await dateEl?.getProperty('innerText')
      )?.jsonValue();
      const date = dateFull?.replace(/no earlier than: |date: /gi, '');

      const missionEl = await card.$('div.launch-info > div.title');
      const missionFull: string | undefined = await (
        await missionEl?.getProperty('innerText')
      )?.jsonValue();
      const mission = missionFull?.replace(/mission: /gi, '');

      const descriptionEl = await card.$(
        'div.launch-info > div.description > p'
      );
      const description = await (
        await descriptionEl?.getProperty('innerText')
      )?.jsonValue();

      nasaLaunches.push({
        launchDate: typeof date === 'string' ? date : 'unknown',
        mission: typeof mission === 'string' ? mission : 'unknown',
        description: typeof description === 'string' ? description : 'unknown',
      });
    }
    await browser.close();
  } catch (error) {
    console.log('Error:', error);
  } finally {
    console.log(nasaLaunches);
  }
})();
