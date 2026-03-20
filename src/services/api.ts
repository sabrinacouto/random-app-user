import axios from 'axios';
import { FetchUsersParams } from './type';

const api = axios.create({
  baseURL: 'https://randomuser.me/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = async ({
  page = 1,
  results = 20,
  gender = '',
  nat = '',
  seed = 'c2s-people-app',
}: FetchUsersParams) => {
  const params: Record<string, string | number> = { page, results, seed };

  if (gender) params.gender = gender;
  if (nat) params.nat = nat;

  const response = await api.get('/', { params });
  return response.data;
};

export default api;