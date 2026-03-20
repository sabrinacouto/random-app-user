import axios from 'axios';

const api = axios.create({
  baseURL: 'https://randomuser.me/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FetchUsersParams {
  page?: number;
  results?: number;
  gender?: string;
  nat?: string;
}

export const fetchUsers = async ({
  page = 1,
  results = 20,
  gender = '',
  nat = '',
}: FetchUsersParams) => {
  const params: Record<string, string | number> = { page, results };

  if (!gender && !nat) params.seed = 'c2s-people-app';
  if (gender) params.gender = gender;
  if (nat) params.nat = nat;

  const response = await api.get('/', { params });
  return response.data;
};

export default api;