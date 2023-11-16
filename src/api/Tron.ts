// Helpers
import axios from 'axios';

// types
import { Transaction, Transactions, TransactionPersonalList } from '../types/tron';


export const listTransactions = async (count: boolean,
                                       limit: number,
                                       start: number,
                                       start_timestamp: number,
                                       end_timestamp: number ): Promise<Transactions> => {
  const res = await axios.get<Transactions>(`tron/transaction?sort=-timestamp&count=${count}&limit=${limit}&start=${start}&start_timestamp=${start_timestamp}&end_timestamp=${end_timestamp}`
  );

  return res.data;
};

export const infoTransaction = async (hash: string): Promise<Transaction> => {
  const res = await axios.get<Transaction>(`tron/transaction-info?hash=${hash}`
  );

  return res.data;
};

export const transactionPersonalList = async (address: string, 
                                              startTimeStamp: number, 
                                              endTimeStamp: number): Promise<TransactionPersonalList> => {
    const res = await axios.get<TransactionPersonalList>(`tron/transfer/token10?address=${address}&trc10Id=1002000&direction=0&reverse=true&db_version=1&start_timestamp=${startTimeStamp}&end_timestamp=${endTimeStamp}`
  );

  return res.data;
};
