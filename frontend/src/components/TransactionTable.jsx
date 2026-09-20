function TransactionTable({ transactions }) {
  return (
    <div className="transaction-section">
      <h2>Recent Transactions</h2>

      <div className="table-container">
        <table>
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
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionId}</td>

                <td>{transaction.fromAccount}</td>

                <td>{transaction.toAccount}</td>

                <td>
                  ₹{transaction.amount.toLocaleString("en-IN")}
                </td>

                <td>
                  <span className="success">
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
