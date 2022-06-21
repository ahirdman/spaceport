import { query } from '../../../db/db';

const GET_ALL_LAUNCHES = 'SELECT lan.*, to_json(loc) "launch_site" FROM launches lan LEFT JOIN locations loc ON lan.launch_site = loc.site_id';

export const getAllLaunches = async (): Promise<any[]> => {
  const data = await query(GET_ALL_LAUNCHES);
  return data;
};
