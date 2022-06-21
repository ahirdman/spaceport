import { query } from './db';
import { INSERT_DATA, formatQuery } from './querys';

export const insertLaunchData = async (data: any[]) => {
  const db = await query(formatQuery(INSERT_DATA, data));
  return db;
};
