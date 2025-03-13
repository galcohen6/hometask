import axios from 'axios';
import { City, Street } from '../types/formTypes';

const CITY_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&';
const STREET_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&';

export const getCities = async (): Promise<City[]> => {
  const response = await axios.get(CITY_URL);
  const records: Record[] = response.data.result.records;
  const uniqueCities: string[] = Array.from(new Set(records.map((rec) => rec.שם_ישוב)));
  return uniqueCities.map((name) => ({ name }));
};


export const getStreets = async (city: string): Promise<Street[]> => {
  const response = await axios.get(STREET_URL);
  const records: Record[] = response.data.result.records.filter((rec: Record) => rec.שם_ישוב === city);
  const uniqueStreets = Array.from(new Set(records.map((rec) => rec.שם_רחוב)));
  return uniqueStreets.map((name) => ({ name })); 
};


interface Record {
  שם_ישוב: string;
  שם_רחוב: string;
}