import { insertLaunchData } from '../db';
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
