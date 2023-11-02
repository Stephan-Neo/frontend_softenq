// Helpers
import axios from 'axios';

// types
import { Transactions } from '../types/tron';


export const listTransactions = async (count: boolean,
                                       limit: number,
                                       start: number,
                                       start_timestamp: number,
                                       end_timestamp: number ): Promise<Transactions> => {
  const res = await axios.get<Transactions>(`tron/transaction?sort=-timestamp&count=${count}&limit=${limit}&start=${start}&start_timestamp=${start_timestamp}&end_timestamp=${end_timestamp}`
  );

  return res.data;
};