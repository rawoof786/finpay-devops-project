import { accounts, transactions } from "../data";

function Dashboard() {
  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  return (
    <div>

      <h1>Welcome back, Rawoof 👋</h1>

      <p>
        Here's what's happening with your FinPay accounts.
      </p>

      <hr />

      <h2>Total Balance</h2>

      <h1>₹{totalBalance.toLocaleString("en-IN")}</h1>

      <p>Across all active accounts</p>

      <hr />

      <h2>Your Accounts</h2>

      {accounts.map((account) => (
        <div key={account.id}>

          <h3>{account.type}</h3>

          <p>
            Account Number: {account.accountNumber}
          </p>

          <p>
            Balance: ₹{account.balance.toLocaleString("en-IN")}
          </p>

        </div>
      ))}

      <hr />

      <h2>Recent Transactions</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((transaction) => (
            <tr key={transaction.id}>

              <td>{transaction.id}</td>

              <td>{transaction.from}</td>

              <td>{transaction.to}</td>

              <td>
                ₹{transaction.amount.toLocaleString("en-IN")}
              </td>

              <td>{transaction.status}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Dashboard;
