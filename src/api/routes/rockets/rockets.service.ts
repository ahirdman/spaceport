import { query } from '../../../db/db';
import { filterRocket } from '../../../db/querys';

const GET_ALL_ROCKETS = 'SELECT * FROM rockets';

export const getAllRockets = async (): Promise<any[]> => {
  const data = await query(GET_ALL_ROCKETS);
  return data;
};

export const getRocket = async (rocket: string): Promise<any[]> => {
  const data = await query(filterRocket(rocket));
  return data;
};
