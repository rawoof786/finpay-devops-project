export const accounts = [
  {
    id: 1,
    holderName: "Rawoof Shaik",
    accountNumber: "FINPAY10001",
    bankName: "FinPay Bank",
    type: "Savings Account",
    balance: 50000,
  },

  {
    id: 2,
    holderName: "Mohammed Ali",
    accountNumber: "HDFC10001",
    bankName: "HDFC Bank",
    type: "Savings Account",
    balance: 25000,
  },

  {
    id: 3,
    holderName: "Rahul Kumar",
    accountNumber: "SBI10001",
    bankName: "State Bank of India",
    type: "Savings Account",
    balance: 30000,
  },

  {
    id: 4,
    holderName: "Priya Sharma",
    accountNumber: "ICICI10001",
    bankName: "ICICI Bank",
    type: "Current Account",
    balance: 40000,
  },
];

export const transactions = [
  {
    id: "TXN1001",
    type: "RECEIVED",
    from: "Company Salary",
    to: "Rawoof Shaik",
    amount: 50000,
    status: "SUCCESS",
    date: "20 Sep 2026",
    time: "10:15 AM",
  },

  {
    id: "TXN1002",
    type: "SENT",
    from: "Rawoof Shaik",
    to: "Mohammed Ali",
    amount: 2500,
    status: "SUCCESS",
    date: "20 Sep 2026",
    time: "08:30 AM",
  },

  {
    id: "TXN1003",
    type: "RECHARGE",
    mobileNumber: "9876543210",
    operator: "Jio",
    amount: 299,
    status: "SUCCESS",
    date: "19 Sep 2026",
    time: "08:15 PM",
  },
];
