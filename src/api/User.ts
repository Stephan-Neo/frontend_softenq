// Helpers
import axios from './helpers/axios';

// types
import { User } from '../types/user';

export const loginUser = async (email: string, password: string): Promise<User> => {
  const res = await axios.post<User>('auth/login', {
    email,
    password,
  });
  return res.data;
};

export const signUpUser = async (email: string, password: string, phone: string, name: string): Promise<User> => {
  const res = await axios.post<User>('auth/signup', {
    email,
    password,
    phone,
    name
  });
  return res.data;
};
