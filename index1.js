// LEVEL 3 – ADVANCED CONSOLE BANKING SYSTEM
// Run using: node index.js

// BANK OBJECT
// 

const bank = {
  bankName: "Vishal Advanced Bank",
  accounts: [],
  nextAccountNumber: 5001
};



// 
// FIND ACCOUNT

function findAccount(accountNumber) {
  return bank.accounts.find(acc => acc.accountNumber === accountNumber);
}



// 
// CREATE ACCOUNT (Savings / Current)
// Savings → Min Balance 1000
// Current → No minimum
// 

function createAccount(name, initialBalance, type) {

  if (type !== "savings" && type !== "current") {
    console.log(" Invalid account type");
    return;
  }

  if (initialBalance < 0) {
    console.log(" Initial balance cannot be negative");
    return;
  }

  if (type === "savings" && initialBalance < 1000) {
    console.log(" Savings account requires minimum ₹1000");
    return;
  }

  const newAccount = {
    accountNumber: bank.nextAccountNumber++,
    name,
    type,
    balance: initialBalance,
    loan: 0,
    transactions: [`Account created with ₹${initialBalance}`]
  };

  bank.accounts.push(newAccount);

  console.log(` ${type.toUpperCase()} account created for ${name}`);
  return newAccount;
}



// 
// DEPOSIT

function deposit(accountNumber, amount) {

  const acc = findAccount(accountNumber);

  if (!acc) {
    console.log(" Account not found");
    return;
  }

  if (amount <= 0) {
    console.log(" Deposit must be greater than 0");
    return;
  }

  acc.balance += amount;
  acc.transactions.push(`Deposited ₹${amount}`);

  console.log(` ₹${amount} deposited`);
}



// WITHDRAW
// Savings → Cannot go below 1000
// 

function withdraw(accountNumber, amount) {

  const acc = findAccount(accountNumber);

  if (!acc) {
    console.log(" Account not found");
    return;
  }

  if (amount <= 0) {
    console.log(" Withdrawal must be greater than 0");
    return;
  }

  if (amount > acc.balance) {
    console.log(" Insufficient balance");
    return;
  }

  if (acc.type === "savings" && acc.balance - amount < 1000) {
    console.log(" Cannot go below ₹1000 in savings account");
    return;
  }

  acc.balance -= amount;
  acc.transactions.push(`Withdrawn ₹${amount}`);

  console.log(`₹${amount} withdrawn`);
}



// APPLY INTEREST (4% for Savings Only)

function applyInterest(accountNumber) {

  const acc = findAccount(accountNumber);

  if (!acc) {
    console.log(" Account not found");
    return;
  }

  if (acc.type !== "savings") {
    console.log(" Interest only for savings accounts");
    return;
  }

  const interest = acc.balance * 0.04;
  acc.balance += interest;

  acc.transactions.push(`Interest added ₹${interest}`);

  console.log(` ₹${interest} interest added`);
}



// LOAN FEATURE
// Max Loan = 5 × Balance

function takeLoan(accountNumber, amount) {

  const acc = findAccount(accountNumber);

  if (!acc) {
    console.log(" Account not found");
    return;
  }

  if (amount <= 0) {
    console.log("Loan amount must be greater than 0");
    return;
  }

  const maxLoan = acc.balance * 5;

  if (amount > maxLoan) {
    console.log(` Loan exceeds limit. Max allowed ₹${maxLoan}`);
    return;
  }

  acc.loan += amount;
  acc.balance += amount;

  acc.transactions.push(`Loan taken ₹${amount}`);

  console.log(`Loan approved ₹${amount}`);
}



// SHOW TRANSACTION HISTORY

function showTransactions(accountNumber) {

  const acc = findAccount(accountNumber);

  if (!acc) {
    console.log(" Account not found");
    return;
  }

  console.log(`\nTransactions for ${acc.name}`);
  console.log("");

  acc.transactions.forEach((t, i) => {
    console.log(`${i + 1}. ${t}`);
  });
}



// BANK SUMMARY
// Total Balance & Total Loans

function bankSummary() {

  let totalBalance = 0;
  let totalLoans = 0;

  bank.accounts.forEach(acc => {
    totalBalance += acc.balance;
    totalLoans += acc.loan;
  });

  console.log("\n📊 BANK SUMMARY");
  console.log("");
  console.log("Total Accounts:", bank.accounts.length);
  console.log("Total Balance in Bank: ₹", totalBalance);
  console.log("Total Loans Given: ₹", totalLoans);
}



//TEST EXECUTION 

console.log("\n========= LEVEL 3 TEST =========");

// Create Accounts
const acc1 = createAccount("Ravi", 5000, "savings");
const acc2 = createAccount("Meena", 3000, "current");

// Transactions
deposit(acc1.accountNumber, 2000);
withdraw(acc1.accountNumber, 1000);

// Interest
applyInterest(acc1.accountNumber);

// Loan
takeLoan(acc1.accountNumber, 10000);

// Show history
showTransactions(acc1.accountNumber);

// Bank summary
bankSummary();

console.log("\n********** PROGRAM END *************");
