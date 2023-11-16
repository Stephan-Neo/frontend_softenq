import { action, makeObservable, observable } from 'mobx';
import { Transaction, TransactionPersonalList, Transactions } from '../types/tron';

class TronStore {
  @observable
  transactions: Transactions | undefined;

  @observable
  transaction: Transaction | undefined;

  @observable
  transactionPersonalList: TransactionPersonalList | undefined;

  @action
  setTransactions = (isTransactions: Transactions) => {
    this.transactions = isTransactions;
  };

  @action
  setTransaction = (isTransaction: Transaction) => {
    this.transaction = isTransaction;
  };

  @action
  setTransactionPersonalList = (isTransactionPersonalList: TransactionPersonalList) => {
    this.transactionPersonalList = isTransactionPersonalList;
  };

  constructor() {
    makeObservable(this);
  }
}

const tronStore = new TronStore();
export default tronStore;
