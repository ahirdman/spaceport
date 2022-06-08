import puppeteer, { ElementHandle } from 'puppeteer';

interface INASAdata {
  launchDate: string;
  mission: string;
  description: string;
  image?: {
    url: string;
  };
}

const getNASA = async () => {
  const nasaLaunches: INASAdata[] = [];

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nasa.gov/launchschedule/', {
      waitUntil: 'networkidle0',
    });

    const cards = await page.$$('#ember14 > div > div.launch-event');

    for (const card of cards) {
      const dateEl = await card.$('div.ember-view > div.date');
      const dateFull: string | undefined = await (await dateEl?.getProperty('innerText'))?.jsonValue();
      const date = dateFull?.replace(/no earlier than: |date: /gi, '');

      const missionEl = await card.$('div.launch-info > div.title');
      const missionFull: string | undefined = await (await missionEl?.getProperty('innerText'))?.jsonValue();
      const mission = missionFull?.replace(/mission: /gi, '');

      const descriptionEl = await card.$('div.launch-info > div.description > p');
      const description = await (await descriptionEl?.getProperty('innerText'))?.jsonValue();

      const imageEl = await card.$('img');
      const imageUrl = await (await imageEl?.getProperty('src'))?.jsonValue();

      nasaLaunches.push({
        launchDate: typeof date === 'string' ? date : 'unknown',
        mission: typeof mission === 'string' ? mission : 'unknown',
        description: typeof description === 'string' ? description : 'unknown',
        image: {
          url: typeof imageUrl === 'string' ? imageUrl : 'unkown',
        },
      });
    }
    await browser.close();
  } catch (error) {
    console.log('Error:', error);
  } finally {
    return nasaLaunches;
  }
};

interface ISFNdata {
  date: string;
  rocket: string;
  mission: string;
  launchWindow: string;
  launchSite: string;
  description: string;
}

const getSpaceFlightNow = async () => {
  const sfnLaunches: ISFNdata[] = [];

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://spaceflightnow.com/launch-schedule/');

    const headers = await page.$$('.datename');

    for (const header of headers) {
      const dateEl = await header.$('.launchdate');
      const date = await (await dateEl?.getProperty('innerText'))?.jsonValue();

      const missionEl = await header.$('.mission');
      const missionFull: string | undefined = await (await missionEl?.getProperty('innerText'))?.jsonValue();
      const missionArr = missionFull!.split(' • ');

      const rocket = missionArr[0];
      const mission = missionArr[1];

      const launchEl = await page.evaluateHandle(el => el.nextElementSibling, header);
      const launchFull: string | undefined = await (await launchEl.getProperty('innerText')).jsonValue();
      const launchArr = launchFull!.split('\n');
      const launchWindow = launchArr[0].replace(/launch time: |launch window: /gi, '');
      const launchSite = launchArr[1].replace(/launch site: /gi, '');

      const descEl = await page.evaluateHandle(el => el.nextElementSibling, launchEl);
      const description: string | undefined = await (await descEl.getProperty('innerText')).jsonValue();

      sfnLaunches.push({
        date: typeof date === 'string' ? date : 'unknown',
        rocket,
        mission,
        launchWindow,
        launchSite,
        description: typeof description === 'string' ? description : 'unknown',
      });
    }
    await browser.close();
  } catch (error) {
    console.log('Error:', error);
  } finally {
    return sfnLaunches;
  }
};

const getAllSchedules = async () => {
  // const NASA = await getNASA();
  const SFN = await getSpaceFlightNow();
  console.log(SFN);
};

getAllSchedules();
