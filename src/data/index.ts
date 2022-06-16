// Use parser on return value of scraper functions
// Export value to db

import { getLaunchData, insertLaunchData } from '../db';
import { ILaucnhData } from './data.interface';
import { getAllSchedules } from './data.scraper';

const insertData = async () => {
  try {
    const data = await getAllSchedules();

    const dataArray: any = [];
    data.forEach((entry: ILaucnhData) => {
      const array = Object.values(entry);
      dataArray.push(array);
    });

    insertLaunchData(dataArray);
  } catch (error) {
    console.log(error);
  }
};

const getData = async () => {
  const data = await getLaunchData(['Artemis%']);
  console.log(data);
};
