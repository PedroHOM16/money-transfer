interface Transaction {
    id?: number,
    debitedAccountId?: number;
    creditedAccountId?: number;
    value: number;
  }
  
export default Transaction;