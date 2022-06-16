import { Pool } from 'pg';
import { dbConfig } from '../config';

const pool = new Pool(dbConfig);

export const query = async (query: any) => {
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err: any) {
    console.log(err);
  }
};
