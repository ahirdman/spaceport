import { query } from './db';
import { INSERT_DATA, formatQuery, GET_ALL_LAUNCHES, selectObject, GET_ALL_LOCATIONS, GET_ALL_ROCKETS } from './querys';

export const insertLaunchData = async (data: any[]) => {
  const db = await query(formatQuery(INSERT_DATA, data));
  return db;
};

export const getLaunchData = async (param: string[]) => {
  const db = await query(selectObject(param));
  return db;
};

export const getAllLaunches = async (): Promise<any[]> => {
  const data = await query(GET_ALL_LAUNCHES);
  return data;
};

export const getAllLocations = async (): Promise<any[]> => {
  const data = await query(GET_ALL_LOCATIONS);
  return data;
};

export const getAllRockets = async (): Promise<any[]> => {
  const data = await query(GET_ALL_ROCKETS);
  return data;
};
