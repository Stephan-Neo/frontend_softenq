import { action, makeObservable, observable } from 'mobx';
import { Transaction, Transactions } from '../types/tron';

class TronStore {
  @observable
  transactions: Transactions | undefined;

  @observable
  transaction: Transaction | undefined;

  @action
  setTransactions = (isTransactions: Transactions) => {
    this.transactions = isTransactions;
  };

  @action
  setTransaction = (isTransaction: Transaction) => {
    this.transaction = isTransaction;
  };

  constructor() {
    makeObservable(this);
  }
}

const tronStore = new TronStore();
export default tronStore;
