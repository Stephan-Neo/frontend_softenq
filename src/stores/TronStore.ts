import { action, makeObservable, observable } from 'mobx';
import { Transaction, Transactions } from '../types/tron';

class TronStore {
  @observable
  transactions: Transactions | undefined;

  @observable
  transaction: Transaction | undefined;

  @observable
  address: string | undefined;

  @action
  setTransactions = (isTransactions: Transactions) => {
    this.transactions = isTransactions;
  };

  @action
  setTransaction = (isTransaction: Transaction) => {
    this.transaction = isTransaction;
  };

  @action
  setAddress = (isAdress: string) => {
    this.address = isAdress;
  };

  constructor() {
    makeObservable(this);
  }
}

const tronStore = new TronStore();
export default tronStore;
