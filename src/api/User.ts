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

export const signUpUser = async (email: string, password: string, name: string): Promise<User> => {
  const res = await axios.post<User>('api/auth/signup', {
    email,
    password,
    name,
  });
  return res.data;
};

export const confirmEmail = async (hash: string): Promise<User> => {
  const res = await axios.post<User>(`api/auth/confirm-email?hash=${hash}`);
  return res.data;
};

export const passwordRecovery = async (email: string): Promise<User> => {
  const res = await axios.post<User>('api/auth/password-recovery', {
    email,
  });
  return res.data;
};

export const updatePassword = async (hash: string, password: string): Promise<User> => {
  const res = await axios.post<User>(`api/auth/update-password?hash=${hash}`, {
    password,
  });
  return res.data;
};
