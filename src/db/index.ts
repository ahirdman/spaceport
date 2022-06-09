import { Pool } from 'pg';
import { dbConfig } from '../config';

const pool = new Pool(dbConfig);

pool.query('SELECT * FROM "locations"', (err, res) => {
  console.log(err, res.rows);
  pool.end();
});
