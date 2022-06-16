import { Pool } from 'pg';
import { dbConfig } from '../config';
import format from 'pg-format';

const pool = new Pool(dbConfig);

export const INSERT_DATA =
  'INSERT INTO launches (launch_date, launch_date_set, launch_site, launch_mission, launch_mission_description, launch_image_url) VALUES %L';

export const RETRIVE_DATA = 'SELECT * FROM LAUNCHES WHERE launch_mission = %L';

export const formatQuery = (text: string, values: any[] | string) => {
  return format(text, values);
};

export const selectObject = (values: string[]) => ({
  text: 'SELECT * FROM LAUNCHES WHERE launch_mission LIKE $1',
  values,
});

export const query = async (query: any) => {
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err: any) {
    console.log(err);
  }
};
