import * as db from './../../../db';

export const getAllLocations = async (): Promise<any> => {
  const locations = await db.getAllLocations();
  return locations;
};
