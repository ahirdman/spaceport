import * as db from './../../../db';

export const getAllLaunches = async (): Promise<any> => {
  const launches = await db.getAllLaunches();
  return launches;
};
