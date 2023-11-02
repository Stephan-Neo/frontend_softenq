import { action, makeObservable, observable } from 'mobx';
import { Transactions } from '../types/tron';

class TronStore {
  @observable
  transactions: Transactions | undefined;

  @action
  setTransactions = (isTransactions: Transactions) => {
    this.transactions = isTransactions;
  };

  constructor() {
    makeObservable(this);
  }
}

const tronStore = new TronStore();
export default tronStore;
