// Helpers
import axios from 'axios';

// types
import { Wallet } from '../types/wallet';


export const addWallet = async (userId: string, address: string,): Promise<Wallet> => {
  const res = await axios.post<Wallet>(`api/wallet/add`, {
    userId,
    address,
  });

  return res.data;
};

export const getWallet = async (userId: string): Promise<Wallet> => {
  const res = await axios.get<Wallet>(`api/wallet/get?userId=${userId}`)

  return res.data;
};
