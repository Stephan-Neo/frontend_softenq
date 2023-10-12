// Helpers
import axios from 'axios';

// types
import { User } from '../types/user';

export const loginUser = async (email: string, password: string): Promise<User> => {
  const res = await axios.post<User>('api/auth/login', {
    email,
    password,
  });
  return res.data;
};

export const signUpUser = async (email: string, password: string, phone: string, name: string): Promise<User> => {
  const res = await axios.post<User>('api/auth/signup', {
    email,
    password,
    phone,
    name,
  });
  return res.data;
};

export const confirmEmail = async (hash: string): Promise<User> => {
  const res = await axios.post<User>(`api/auth/confirm-email?hash=${hash}`);
  return res.data;
};
