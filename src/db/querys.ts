import format from 'pg-format';

export const INSERT_DATA =
  'INSERT INTO launches (launch_date, launch_date_set, launch_site, launch_mission, launch_mission_description, launch_image_url) VALUES %L';

export const formatQuery = (text: string, values: any[] | string) => format(text, values);

export const selectObject = (values: string[]) => ({
  text: 'SELECT * FROM launch_data WHERE launch_mission LIKE $1',
  values,
});

export const filterRocket = (rocket: string) => ({
  text: 'SELECT * FROM rockets WHERE rocket_name ILIKE $1',
  values: [rocket],
});
