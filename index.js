
// LEVEL 1 – SINGLE ACCOUNT


const account = {
  accountNumber: 1001,
  name: "Vishal",
  balance: 5000,
  transactions: []
};


function deposit(acc, amount) {
  if (amount <= 0) {
    console.log("Deposit amount must be greater than 0");
    return;
  }

  acc.balance += amount;
  acc.transactions.push(`Deposited ₹${amount}`);
  console.log(`Deposited ₹${amount}`);
}


function withdraw(acc, amount) {
  if (amount <= 0) {
    console.log("Withdrawal must be greater than 0");
    return;
  }

  if (amount > acc.balance) {
    console.log(" Insufficient balance");
    return;
  }

  acc.balance -= amount;
  acc.transactions.push(`Withdrawn ₹${amount}`);
  console.log(`Withdrawn ₹${amount}`);
}


function checkBalance(acc) {
  console.log(`Current Balance: ₹${acc.balance}`);
}

console.log("LEVEL 1 TEST ");

deposit(account, 2000);
withdraw(account, 1000);
checkBalance(account);

console.log("Transactions:", account.transactions);








// LEVEL 2 – MULTI ACCOUNT BANK


const bank = {
  bankName: "Vishal Bank",
  accounts: [],
  nextAccountNumber: 2001
};

function createAccount(name, initialBalance) {
  const newAccount = {
    accountNumber: bank.nextAccountNumber++,
    name,
    balance: initialBalance,
    transactions: []
  };

  bank.accounts.push(newAccount);
  console.log(`Account created for ${name} (Acc No: ${newAccount.accountNumber})`);
  return newAccount;
}

function findAccount(accountNumber) {
  return bank.accounts.find(acc => acc.accountNumber === accountNumber);
}


function bankDeposit(accountNumber, amount) {
  const acc = findAccount(accountNumber);

  if (!acc) {
    console.log("Account not found");
    return;
  }

  deposit(acc, amount);
}

function bankWithdraw(accountNumber, amount) {
  const acc = findAccount(accountNumber);

  if (!acc) {
    console.log(" Account not found");
    return;
  }

  withdraw(acc, amount);
}


function transfer(fromAccNo, toAccNo, amount) {
  const sender = findAccount(fromAccNo);
  const receiver = findAccount(toAccNo);

  if (!sender || !receiver) {
    console.log(" One or both accounts not found");
    return;
  }

  if (amount > sender.balance) {
    console.log("Insufficient balance for transfer");
    return;
  }

  sender.balance -= amount;
  receiver.balance += amount;

  sender.transactions.push(`Transferred ₹${amount} to ${toAccNo}`);
  receiver.transactions.push(`Received ₹${amount} from ${fromAccNo}`);

  console.log(`Transfer successful: ₹${amount}`);
}

function showAllAccounts() {
  console.log("\n All Bank Accounts:");
  bank.accounts.forEach(acc => {
    console.log(`Acc No: ${acc.accountNumber} | Name: ${acc.name} | Balance: ₹${acc.balance}`);
  });
}

console.log("\n LEVEL 2 TEST ");

const acc1 = createAccount("Arun", 10000);
const acc2 = createAccount("Priya", 8000);

bankDeposit(acc1.accountNumber, 2000);
bankWithdraw(acc2.accountNumber, 1000);
transfer(acc1.accountNumber, acc2.accountNumber, 3000);

showAllAccounts();



// LEVEL 3


function createAccount(name, initialBalance, type) {
  if (type === "savings" && initialBalance < 1000) {
    console.log(" Savings account requires minimum ₹1000");
    return;
  }

  const newAccount = {
    accountNumber: bank.nextAccountNumber++,
    name,
    balance: initialBalance,
    type,
    loan: 0,
    transactions: []
  };

  bank.accounts.push(newAccount);
  console.log(` ${type.toUpperCase()} account created for ${name}`);
  return newAccount;
}


function applyInterest(accountNumber) {
  const acc = findAccount(accountNumber);

  if (!acc) return console.log(" Account not found");

  if (acc.type !== "savings") {
    console.log(" Interest only for savings accounts");
    return;
  }

  const interest = acc.balance * 0.04;
  acc.balance += interest;
  acc.transactions.push(`Interest added ₹${interest}`);

  console.log(` Interest ₹${interest} added`);
}


function takeLoan(accountNumber, amount) {
  const acc = findAccount(accountNumber);

  if (!acc) return console.log(" Account not found");

  const maxLoan = acc.balance * 5;

  if (amount > maxLoan) {
    console.log(" Loan exceeds limit");
    return;
  }

  acc.loan += amount;
  acc.balance += amount;
  acc.transactions.push(`Loan taken ₹${amount}`);

  console.log(` Loan approved ₹${amount}`);
}


function bankSummary() {
  let totalBalance = 0;
  let totalLoans = 0;

  bank.accounts.forEach(acc => {
    totalBalance += acc.balance;
    totalLoans += acc.loan;
  });

  console.log("\nBank Summary");
  console.log("Total Bank Balance:", totalBalance);
  console.log("Total Loans Given:", totalLoans);
}


console.log("\n LEVEL 3 TEST ");

const acc3 = createAccount("Ravi", 5000, "savings");
const acc4 = createAccount("Meena", 3000, "current");

applyInterest(acc3.accountNumber);
takeLoan(acc3.accountNumber, 10000);

bankSummary();
