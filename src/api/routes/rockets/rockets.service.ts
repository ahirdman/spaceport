import * as db from './../../../db';

export const getAllRockets = async (): Promise<any> => {
  const rockets = await db.getAllRockets();
  return rockets;
};
