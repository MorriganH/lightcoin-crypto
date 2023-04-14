class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let total = 0;
    for (let transaction of this.transactions) {
      total += transaction.value;
    }
    return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }

}

class Withdrawal extends Transaction {

  isAllowed() {
    if (this.account.balance >= this.amount) {
      return true;
    }
    return false;
  }

  get value() {
    return -this.amount;
  }


}

class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-partol');

t1 = new Withdrawal(1, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Deposit(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Withdrawal(9.99, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

t4 = new Deposit(120.00, myAccount);
t4.commit();
console.log('Transattion 4:', t4);

console.log('Balance:', myAccount.balance);

console.log('Transaction History:', myAccount.transactions);
