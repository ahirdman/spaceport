import { Pool } from 'pg';
import { dbConfig } from '../config';

const pool = new Pool(dbConfig);

export const query = async (query: any) => {
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err: any) {
    throw new Error();
  }
};
