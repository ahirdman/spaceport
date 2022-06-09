import puppeteer from 'puppeteer';

interface ILaucnhData {
  launchDate: string;
  launchWindow?: string;
  launchSite?: {
    id?: number;
    country?: string;
    location: string;
    siteName?: string;
    coordinates?: string;
  };
  mission: {
    name: string;
    description: string;
    href?: string;
    payload?: string;
    provider?: string;
  };
  rocket?: string;
  image?: {
    url: string;
  };
}

const locationExtractor = (text: string) => {
  if (text.match(/kennedy space center/gim)) {
    return {
      country: 'USA',
      location: 'Florida',
      siteName: 'Kennedy Space Center',
      coordinates: '28.524167, -80.650833',
    };
  }
  if (text.match(/vandenberg space force/gim)) {
    return {
      country: 'USA',
      location: 'California',
      siteName: 'Vandenberg Space Force Base',
      coordinates: '34.732778, -120.568056',
    };
  }
  if (text.match(/cape canaveral space/gim)) {
    return {
      country: 'USA',
      location: 'Florida',
      siteName: 'Cape Canaveral Space Force Station',
      coordinates: '28.488889, -80.577778',
    };
  }
};

const getNASA = async () => {
  const nasaLaunches: ILaucnhData[] = [];

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nasa.gov/launchschedule/', {
      waitUntil: 'networkidle0',
    });

    const cards = await page.$$('#ember14 > div > div.launch-event');

    for (const card of cards) {
      const dateHandler = await card.$('div.ember-view > div.date');
      const dateFull: string | undefined = await (await dateHandler?.getProperty('innerText'))?.jsonValue();
      const date = dateFull?.replace(/no earlier than: |date: /gi, '');

      const missionHandler = await card.$('div.launch-info > div.title');
      const missionFull: string | undefined = await (await missionHandler?.getProperty('innerText'))?.jsonValue();
      const missionName = missionFull?.replace(/mission: /gi, '');

      const descriptionHandler = await card.$('div.launch-info > div.description > p');
      const description: string | undefined = await (await descriptionHandler?.getProperty('innerText'))?.jsonValue();

      const location = locationExtractor(description!);

      const imageHandler = await card.$('img');
      const imageUrl = await (await imageHandler?.getProperty('src'))?.jsonValue();

      nasaLaunches.push({
        launchDate: typeof date === 'string' ? date : 'unknown',
        launchSite: location ? location : { location: 'unknown' },
        mission: {
          name: typeof missionName === 'string' ? missionName : 'unknown',
          description: typeof description === 'string' ? description : 'unknown',
        },
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

const getSpaceFlightNow = async () => {
  const sfnLaunches: ILaucnhData[] = [];

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://spaceflightnow.com/launch-schedule/');

    const headers = await page.$$('.datename');

    for (const header of headers) {
      const dateHandler = await header.$('.launchdate');
      const launchDate = await (await dateHandler?.getProperty('innerText'))?.jsonValue();

      const missionHandler = await header.$('.mission');
      const missionData: string | undefined = await (await missionHandler?.getProperty('innerText'))?.jsonValue();
      const [rocket, missionName] = missionData!.split(' • ');

      const launchHandler = await page.evaluateHandle(el => el.nextElementSibling, header);
      const launchFull: string | undefined = await (await launchHandler.getProperty('innerText')).jsonValue();
      const [windowData, siteData] = launchFull!.split('\n');
      const launchWindow = windowData.replace(/launch time: |launch window: /gi, '');
      const location = siteData.replace(/launch site: /gi, '');

      const descriptionHandler = await page.evaluateHandle(el => el.nextElementSibling, launchHandler);
      const description: string | undefined = await (await descriptionHandler.getProperty('innerText')).jsonValue();

      sfnLaunches.push({
        launchDate: typeof launchDate === 'string' ? launchDate : 'unknown',
        launchWindow,
        mission: {
          name: missionName,
          description: typeof description === 'string' ? description : 'unknown',
        },
        launchSite: {
          location,
        },
        rocket,
      });
    }
    await browser.close();
  } catch (error) {
    console.log('Error:', error);
  } finally {
    return sfnLaunches;
  }
};

// const findDuplicates = (...launchArr: INASAdata[] | ISFNdata[]) => {

// }

// TODO === Format Data // type and structure

// TODO == Check for duplicates

// TODO === Filter out non-space bound launches

// TODO === if duplicate, update object or replace data in object

const getAllSchedules = async () => {
  const NASA = await getNASA();
  // const SFN = await getSpaceFlightNow();
  // const allData = NASA.concat(SFN);
  console.log(NASA);
};

getAllSchedules();
