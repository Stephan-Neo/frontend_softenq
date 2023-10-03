// Helpers
import axios from './helpers/axios';

// types
import { User } from '../types/user';

export const loginUser = async (email: string, password: string): Promise<User> => {
  const res = await axios.post<User>('auth/login', {
    uuid: 'd67dc53d-1181-4ea1-b6b5-c002bfabbf59',
    email,
    password,
  });
  return res.data;
};
