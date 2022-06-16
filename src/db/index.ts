import { query, INSERT_DATA, formatQuery, RETRIVE_DATA, selectObject } from './db';

export const insertLaunchData = async (data: any[]) => {
  const db = await query(formatQuery(INSERT_DATA, data));
  return db;
};

export const getLaunchData = async (param: string[]) => {
  const db = await query(selectObject(param));
  return db;
};
