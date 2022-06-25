import { query } from './db';
import { INSERT_DATA, formatQuery, INSERT_TEST_DATA } from './querys';

export const insertLaunchData = async (data: any[]) => {
  const db = await query(formatQuery(INSERT_DATA, data));
  return db;
};

export const dummyData = async () => {
  const data = await query(INSERT_TEST_DATA);
  return data;
};
