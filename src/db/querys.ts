import format from 'pg-format';

export const INSERT_DATA =
  'INSERT INTO launches (launch_date, launch_date_set, launch_site, launch_mission, launch_mission_description, launch_image_url) VALUES %L';

export const GET_ALL_LAUNCHES = 'SELECT * FROM launch_data';

export const GET_ALL_LOCATIONS = 'SELECT country, location, site_id, site_name_long, coordinates FROM locations';

export const GET_ALL_ROCKETS = 'SELECT * FROM rockets';

export const formatQuery = (text: string, values: any[] | string) => {
  return format(text, values);
};

export const selectObject = (values: string[]) => ({
  text: 'SELECT * FROM launch_data WHERE launch_mission LIKE $1',
  values,
});
