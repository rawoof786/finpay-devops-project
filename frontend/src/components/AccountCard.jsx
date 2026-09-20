function AccountCard({ account }) {
  return (
    <div className="account-card">
      <div className="account-header">
        <span>{account.accountNumber}</span>
        <span className="status">{account.status}</span>
      </div>

      <h2>
        ₹{account.balance.toLocaleString("en-IN")}
      </h2>

      <p>{account.customerName}</p>

      <small>Available Balance</small>
    </div>
  );
}

export default AccountCard;
