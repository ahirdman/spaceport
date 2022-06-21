import { query } from '../../../db/db';

const GET_ALL_LOCATIONS = 'SELECT * FROM locations';

export const getAllLocations = async (): Promise<any[]> => {
  const data = await query(GET_ALL_LOCATIONS);
  return data;
};
